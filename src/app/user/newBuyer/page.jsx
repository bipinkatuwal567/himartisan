import React from 'react'
import BuyerForm from '../../../components/BuyerForm'
import { getServerSession } from 'next-auth'
import prisma from "../../../db/dbconfig";
const page = async () => {

      const session=await getServerSession();
      const user=await prisma.user.findFirst({
            where:{
                  email:session.user.email
            }
      })
  return (
    <div className='w-full grainy'>
        <BuyerForm user={user}/>
    </div>
  )
}

export default page