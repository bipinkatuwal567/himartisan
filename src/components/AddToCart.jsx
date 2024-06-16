"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";
import CryptoJS from 'crypto-js';

const AddToCart = () => {
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useKindeBrowserClient();
  const email = user?.email || "";

  useEffect(() => {
    async function getMyCart() {
      try {
        const response = await axios.get('/api/getmycart', { params: { email } });
        if (response.data.success) {
          setCart(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getMyCart();
  }, [email]);

  // Calculate grandTotal whenever cart or qty changes
  useEffect(() => {
    let total = 0;
    if (cart) {
      cart.forEach(item => {
        total += item.price * item.qty;
      });
    }
    setGrandTotal(total);
  }, [cart, qty]);

  async function handleDelete(id) {
    try {
      await axios.post('/api/deletecart', { email, productId: id });
      toast.success("Item Deleted from Cart");
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      toast.error("Failed to delete item from cart");
    }
  }

  async function handleCheckout() {
    setIsLoading(true);

    // Check if the user is logged in
    if (!email) {
      LoginLink();
      return;
    }
   try {
      await axios.post('/api/placeorder',{email, cart}).then((res)=>{
          });
      
   } catch (error) {
   }
    // Generate a unique transaction UUID
    const uuid = new Date().getTime().toString().slice(-6);

    // Prepare data for eSewa payment
    const jsonData = {
      amount: grandTotal.toString(),
      failure_url: `http://localhost:3000/order-failed`,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: "",
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: `http://localhost:3000/order-confirmed?uuid=${uuid}&`,
      tax_amount: "0",
      total_amount: grandTotal.toString(),
      transaction_uuid: uuid
    };

    // Create the signature for eSewa payment
    const message = "total_amount=" + jsonData.total_amount + ",transaction_uuid=" + jsonData.transaction_uuid + ",product_code=" + jsonData.product_code;
    const signature = createSignature(message);
    jsonData.signature = signature;

    // Submit form for eSewa payment
    let url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    const form = document.createElement("form");
    for (const key in jsonData) {
      const field = document.createElement("input");
      field.setAttribute("type", "hidden");
      field.setAttribute("name", key);
      field.setAttribute("value", jsonData[key]);
      form.appendChild(field);
    }

    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    document.body.appendChild(form);
    form.submit();

   

    setIsLoading(false);
  }

  function createSignature(message) {
    const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }

  return (
    <div className="mt-5 flex flex-col w-full lg:h-[calc(100vh-18rem)] h-screen">
      <h2 className="text-2xl font-bold border-b border-gray-300 pb-2">Cart</h2>
      <div className="mt-8 flex w-full lg:justify-between items-start lg:items-start gap-10 flex-col lg:flex-row">
        <table className="flex justify-between">
          <tbody>
            <tr className="grid grid-cols-4 sm:grid-cols-3 gap-10 place-items-start text-gray-600">
              <th className="col-span-2 font-normal sm:col-span-1">Products</th>
              <th className="font-normal">Quantity</th>
              <th className="font-normal">Subtotal</th>
            </tr>
            {cart && cart.length > 0 ? (
              cart.map((item) => (
                <CartCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  qty={item.qty}
                  ImagePath={item.ImagePath}
                  setQty={(newQty) => {
                    // Update quantity of the specific item in cart
                    const updatedCart = cart.map((cartItem) =>
                      cartItem.id === item.id ? { ...cartItem, qty: newQty } : cartItem
                    );
                    setCart(updatedCart);
                  }}
                  handleDelete={() => handleDelete(item.id)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4">No Products to Show</td>
              </tr>
            )}
          </tbody>
        </table>
        {!isLoading && cart && cart.length === 0 && <div>No Products to Show</div>}
        {isLoading && <tr><div>Fetching Product</div></tr>}

        <div className="flex flex-col w-2/3 md:w-2/4 border-t border-t-gray-300 pt-5 lg:pt-0 lg:w-1/3 gap-6 border-l pl-4 lg:border-0">
          <p className="font-bold">Summary</p>
          <div className="flex gap-2 justify-between">
            <p className="text-gray-600">Delivery Charge</p>
            <p className="text-gray-600">$0</p>
          </div>

          <div className="flex gap-2 justify-between">
            <p className="font-bold">Grand Total</p>
            <p className="font-bold">${grandTotal.toFixed(2)}</p>
          </div>

          {email ? <Button onClick={handleCheckout}>{isLoading? "Checking Out":"Checkout"}</Button> : <Button onClick={LoginLink}>Login to checkout</Button>}
        </div>
      </div>
    </div>
  );
};

function CartCard({ id, name, price, qty, setQty, handleDelete , ImagePath}) {


      const image=`Images%2F${ImagePath?.split("/")[1]}`
                  const url=`https://firebasestorage.googleapis.com/v0/b/first-hackathon-ecommerce.appspot.com/o/${image}?alt=media&token=6277845b-c2ca-43fb-931a-be27634e4069`
  const handleQtyChange = (newQty) => {
    if (newQty >= 1) {
      setQty(newQty);
    }
  };

  return (
    <tr className="mt-5 grid grid-cols-4 sm:grid-cols-3 w-full place-items-start justify-items-start gap-10">
      <td className="flex items-center gap-3 col-span-2 sm:col-span-1">
        <Image
          src={url}
          height={70}
          width={70}
          className="bg-gray-200 rounded-md"
          alt={"Product Image"}
        />
        <div className="flex flex-col">
          <p className="font-bold">{name}</p>
          <p className="text-gray-600">{`$${price.toFixed(2)}`}</p>
        </div>
      </td>

      <td className="flex items-center border border-black rounded-lg sm:gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQtyChange(qty - 1)}
        >
          -
        </Button>
        <p>{qty}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleQtyChange(qty + 1)}
        >
          +
        </Button>
      </td>

      <td className="flex items-center flex-col sm:flex-row gap-2 md:gap-5">
        <p className="text-gray-600">{`$${(qty * price).toFixed(2)}`}</p>
        <FaTrash className="w-4 h-4 cursor-pointer" onClick={handleDelete} />
      </td>
    </tr>
  );
}

export default AddToCart;
