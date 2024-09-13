"use client"; // Ensures this component is treated as a client component
import SuspenseBoundary from '../../components/SuspenseBoundary'; // Adjust path as needed
import { useSearchParams } from 'next/navigation';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PageContent = () => {
  const [uuid, setUuid] = useState(null);
  const params = useSearchParams();

  useEffect(() => {
    const uuidParam = params.get("uuid");
    if (uuidParam) {
      setUuid(uuidParam);
    }

    async function clearCart() {
      try {
        const res = await axios.post('/api/clearcart');
        console.log(res.data);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }

    clearCart();
  }, [params]);

  return (
    <div className="flex w-full flex-col h-screen justify-center items-center">
      <h2 className="text-7xl font-extrabold">Thank you for your order!</h2>
      <p className="text-base text-gray-800 mt-5">
        Your order has been confirmed. You will receive an email confirmation
        shortly. Your order ID is {uuid}
      </p>
      <Link href={"/"}>
        <Button className="mt-10">Go back to home page</Button>
      </Link>
    </div>
  );
};

const Page = () => (
  <SuspenseBoundary>
    <PageContent />
  </SuspenseBoundary>
);

export default Page;
