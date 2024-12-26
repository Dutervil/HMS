import Image from 'next/image'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-1/2 h-full flex items-center justify-center'>{children}</div>
            <div className="hidden md:flex w-1/2 h-full relative">
                <Image src="https://images.pexels.com/photos/3844581/pexels-photo-3844581.jpeg?auto=compress&cs=tinysrgb&w=600"
                    width={1000} height={1000} alt="Hospital Image" className='w-full h-full object-cover' />
                <div className="absolute top-0 w-full h-full bg-black bg-opacity-40 z-10 flex justify-center flex-col items-center" >
                    <h1 className="text-3xl 2xl:text-5xl font-bold text-white">WD HMS</h1>
                    <p className='text-green-950 font-bold text-base'>Welcome to Hospital management system</p>
                </div>
            </div>
        </div>
    )
}

export default layout