import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token)
//     if(req.nextauth.token.role==="SELLER")
//       return NextResponse.redirect(new URL('/seller', req.url))
//     else if(req.nextauth.token.role==="BUYER")
//       return NextResponse.redirect(new URL('/', req.url))
//     else
//       return NextResponse.redirect(new URL('/login', req.url))

  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "SELLER",
    },
    
  },
)

export const config = { matcher: ["/seller"] }