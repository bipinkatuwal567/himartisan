"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.jsx";

import { Button } from "../components/ui/button";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";
const AvatarComponent = ({ altName, img, list, email }) => {
  return (
    <DropdownMenu className="w-full flex ">
      <DropdownMenuTrigger className="outline-none border-none">
        <Avatar>
          <AvatarImage src={img} />
          <AvatarFallback className="bg-orange-500 text-white">
            {altName && altName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto px-1 py-2 mr-5 flex flex-col items-center">
        <DropdownMenuLabel className="text-sm font-normal truncate text-gray-500">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {list &&
          list.length > 0 &&
          list.map((data, i) => {
            return <DropdownMenuItem key={i}>{data}</DropdownMenuItem>;
          })}

        <DropdownMenuItem>
            <Button className="text-white w-full" onClick={()=>signOut()}>
              <LuLogOut className="mr-2" /> Logout
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
