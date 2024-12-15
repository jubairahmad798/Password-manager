import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-900 text-white flex justify-between items-center px-4 py-5 h-15'>
      <div className="logo text-2xl flex items-center  font-bold">
        {/* <span className="text-purple-700"></span> */}
        My
        <span className="text-purple-700">Password</span>
        <span className="material-symbols-outlined text-4xl ">
          key
        </span>


      </div>
      {/* <ul>
            <li className='flex gap-10'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold'href="#">About</a>
                <a className='hover:font-bold'href="#">Contact</a>


            </li>
        </ul> */}
      <button className='  flex items-center  rounded-full border text-xl font-bold text-black bg-white  py-2 px-4'>
        <img className='w-8' src="github.svg" alt="github-logo" />
        GitHub
      </button>


    </nav>
  )
}

export default Navbar
