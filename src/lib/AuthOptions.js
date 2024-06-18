import GoogleProvider from 'next-auth/providers/google'
import prisma from '../db/dbconfig'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const AuthOptions = {
      adapter:PrismaAdapter(prisma),
      session: {
            strategy:"jwt"
      },
      pages:{
            signIn: '/login', 
      },

      providers:[
          GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
          })
      ],
      callbacks: {
            async session({token, session}){
                  if(token){
                        return {...session, user:{...session.user, role:token.role}}
                  }

                  return session
            },
            async jwt({token ,user}){
                  const dbUser=await prisma.user.findFirst({
                        where: {
                              email:token.email
                        },

                  })

                  if(!dbUser){
                        return token
                  }
                  return {
                        id:dbUser.id,
                        name:dbUser.name,
                        role:dbUser.role,
                        email:dbUser.email,
                        picture:dbUser.image
                  }
            }
      }
}