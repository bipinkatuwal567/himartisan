// File: src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth/next';
import { AuthOptions } from '../../../../lib/AuthOptions';

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
