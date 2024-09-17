import AddToCart from '../../../components/AddToCart'
import React from 'react'
import PurchaseHistory from '../../../components/PurchaseHistory'

const Page = () => {
  return (
      <div className='min-h-[calc(100vh-16rem)] flex justify-center items-center flex-col'>
    <AddToCart />
    <PurchaseHistory />
      </div>
  )
}

export default Page