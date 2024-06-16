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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
const AvatarComponent = ({ altName, img, list, email }) => {
  return (
    <DropdownMenu className="w-full flex">
      <DropdownMenuTrigger className="outline-none border-none">
        <Avatar>
          <AvatarImage src={img} />
          <AvatarFallback className="bg-orange-500 text-white">
            {altName && altName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[10rem] mr-5 flex flex-col items-center">
        <DropdownMenuLabel className="text-sm font-normal truncate text-gray-500">
          {email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {list &&
          list.length > 0 &&
          list.map((data) => {
            return <DropdownMenuItem>{data}</DropdownMenuItem>;
          })}

        <DropdownMenuItem>
          <LogoutLink>
            <Button className="text-white w-full">
              <LuLogOut className="mr-2" /> Logout
            </Button>
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarComponent;
