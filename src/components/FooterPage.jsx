import React from "react";
import { FiTwitter } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

const FooterPage = () => {
  return (
    <div className="flex flex-col py-5 mt-8 mb-3 border-t border-b border-gray-300 items-center gap-y-2 grainy relative bottom-0">
      <h2 className="uppercase font-semibold">Himartisan</h2>
      <p>&copy;2024 Himartisan All rights reserved.</p>
      <div className="flex gap-20 mt-2">
        <FaFacebookSquare className="w-5 h-5 cursor-pointer hover:text-orange-500 transition duration-200" />
        <GrInstagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition duration-200" />
        <FiTwitter className="w-5 h-5 cursor-pointer hover:text-orange-500 transition duration-200" />
      </div>
    </div>
  );
};

export default FooterPage;
