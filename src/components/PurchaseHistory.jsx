"use client";
import axios from "axios";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {formatDate, isNotYetDelivered} from '../lib/formatDate'
import StarRating from "./StarRating";
import {
      Dialog,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
      DialogTrigger,
} from "./ui/dialog"
import Link from "next/link";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea} from "./ui/textarea";
import toast from "react-hot-toast";

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [rating, setRating] = React.useState(2);

  useEffect(() => {
    async function getPurchaseHistory() {
      await axios.get("/api/getpurchasehistory").then((response) => {
        console.log(response.data);
        setPurchaseHistory(response.data.products);
        setLoading(false);
      });
    }

    getPurchaseHistory();
  }, []);

  const handleSubmit=async(e, deliveredOn)=>{
      if(isNotYetDelivered(deliveredOn)) return toast.error("Review will unlock after product is Delivered")
      const review=document.getElementById('review').value
      if(review=="") return toast.error(" Review Cannot Be Empty")
      try{
            await axios.post('/api/givereview',{rating,productId:e, review })
            .then((res)=>{
                  if(res.data.success)
                        toast.success("Review Added Successfully")
                  else{
                        toast.error(res.data.message)
                  }
            })
      } catch(e){
            console.log(e)
            toast.error(e.message)
      }
  }
  return (
    <>
      {/* <Button onClick={()=>{setOpen(!open)}}>{open?"Close ":"See Your Purchase History"}</Button> */}
      {open ? (
        <div className="max-w-[1200px] w-full">
          <h1 className="sm:text-2xl text-start self-start lg:text-3xl mb-5 font-semibold py-4 border-b border-slate-300 ">
            Purchase History
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            {purchaseHistory.length > 0 ? (
              purchaseHistory.map((product) => {
                const image = `Images%2F${product.ImagePath.split("/")[1]}`;

                const url = `https://firebasestorage.googleapis.com/v0/b/first-hackathon-ecommerce.appspot.com/o/${image}?alt=media&token=6277845b-c2ca-43fb-931a-be27634e4069`;

                return (
                  <Card key={product.id} className="md:min-w-[500px] w-full">
                    <CardContent className="flex py-4 px-4 sm:px-5 flex-col sm:flex-row">
                        <div className="flex items-center justify-between sm:w-2/3">

                      <div className="w-1/2 ">
                        <img src={url} className=" object-cover  overflow-hidden " />
                      </div>
                      <div className="w-1/2">
                        <h1 className="text-xl font-semibold">
                          {product.name}
                        </h1>
                        <p className="text-slate-700 ">
                          Price Paid: Rs.{product.price}
                        </p>
                        <p className="text-slate-700">
                          Quantity: {product.qty}
                        </p>
                        <p className="text-slate-700 italic font-light">
                          Purchased Date:<br/> {formatDate(product.purchasedOn) || "asdasdasd"}
                        </p>
                        <p className="text-slate-700 italic font-light">
                          Delivered Date: <br/> {isNotYetDelivered(product.deliveredOn) ? "Not Yet Delivered" : formatDate(product.deliveredOn)}
                        </p>
                      </div>
                      </div>

                      <div className="sm:w-1/3 w-1/2 self-end sm:self-auto flex sm:flex-col justify-center gap-4 flex-row">
                        <Link href={`product/${product.id}`}>
                          <Button className='w-full'>View More Details</Button>
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Review </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Give Your Review</DialogTitle>
                              <DialogDescription>
                                About Product and purchase Experience
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-2 items-center gap-2">
                                <Label htmlFor="name" className="text-left">
                                  How was you Purchasing Experience?
                                </Label>
                                <StarRating
                                  messages={[]}
                                  className=""
                                  maxRating={5}
                                  color="#FF5315"
                                  size={24}
                                  onSetRating={setRating}
                                  defaultRating={2}
                                />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-4">
                                <Label htmlFor="username" className="text-left">
                                  Write Your Review
                                </Label>
                                <Textarea
                                  id="review"
                                  placeholder="Type your review here. "
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                disabled={loading}
                                type="button"
                                variant={"default"}
                                onClick={() => handleSubmit(product.id, product.deliveredOn)}
                              >
                                Submit Review
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div>
                {!loading
                  ? "No Purhcase History"
                  : "Loading your Purchase History..."}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PurchaseHistory;
