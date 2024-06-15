"use client";
import React, { use, useState } from "react";
import AvatarComponent from "../../../components/AvatarComponent";
import { Button } from "../../../components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const page = () => {
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const [username, setUsername] = useState("");
  const authUsername = String(`${user?.given_name} ${user?.family_name}`);

  function handleSubmit() {
    console.log(username);
  }

  return (
    <div className="p-4 xl:ml-80">
      <nav className="block w-full max-w-full bg-transparent text-white shadow-none rounded-xl transition-all px-0 py-1">
        <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
          <div className="capitalize">
            <h6 className="block antialiased tracking-normal font-sans text-lg font-semibold leading-relaxed text-gray-900">
              Profile
            </h6>
          </div>

          <AvatarComponent
            img={user?.picture}
            altName={user?.given_name}
            list={["Dashboard", "Profile", "Add Product"]}
          />
        </div>
      </nav>

      <form className="rounded-lg mt-8 flex flex-col gap-y-5">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Username</label>
          <input
            value={username.length > 0 ? username : user ? authUsername : ""}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="border-2 border-gray-200 outline-none p-1 px-2 rounded-md focus:border-gray-300"
            // disabled={loading}
          />
        </div>

        <Button
          type="button"
          className=" self-start text-white"
          onClick={() => handleSubmit()}
        >
          Update Account
        </Button>
      </form>
    </div>
  );
};

export default page;
