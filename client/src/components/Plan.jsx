import React from 'react'
import { PricingTable } from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='bg-gradient-to-b from-black to-neutral-950 text-white py-24 px-4 sm:px-20 xl:px-32'>
      <div className='max-w-2xl mx-auto z-20'>

        <div className='text-center'>
          <h2 className='text-white text-[42px] font-semibold'>Choose Your <span className="text-[#00FFA3]">Plan</span></h2>
          <p className='text-gray-400 max-w-lg mx-auto'>
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
          </p>
        </div>

        <div className='mt-14 max-sm:mx-8'>
          <PricingTable />
        </div>

      </div>
    </div>
  )
}

export default Plan
