import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='bg-black text-white'>

                <div className="logo text-xl flex items-center justify-center font-bold">
                    {/* <span className="text-purple-700"></span> */}
                    My
                    <span className="text-purple-700">Password</span>
                    <span className="material-symbols-outlined text-xl ">
                        key
                    </span>


                </div>




                <div className='flex items-center justify-center gap-1'>
                    Created with<span className="material-symbols-outlined ">
                        volunteer_activism
                    </span>by Jubair



                </div>
                <div className='flex justify-center'>
                    Copyright 	&copy; 2024
                </div>
            </div>
        </>

    )
}

export default Footer
