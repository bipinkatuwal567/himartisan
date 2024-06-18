import NextAuth from "next-auth/next";
import { AuthOptions } from "../../../../lib/AuthOptions";

const handlers=NextAuth(AuthOptions)

export {handlers as GET, handlers as POST}