import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { redirect } from "next/dist/server/api-utils";

const middleware = (req, res) => {
  const authResult = withAuth(req, res);
  
  // Check authentication result
  if (!authResult.authenticated) {
    return redirect(res, '/');
  }

  return authResult; // Return the original withAuth result if authenticated
};

export default middleware;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure matcher for protected routes
export const protectedRoutes = ["/seller/*"];
