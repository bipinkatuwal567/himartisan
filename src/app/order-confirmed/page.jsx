"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const page = () => {
  const params = useSearchParams();
  const uuid = params.get("uuid");

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

export default page;
