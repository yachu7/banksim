import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className={"flex flex-col justify-center items-center   gap-4 p-4  md:flex-row md:justify-normal md:py-6 bg-slate-800 text-white"}>
            <div className="font-bold text-3xl px-2 cursor-pointer  border-white border-b-2 md:border-none" >
                <Link to={'/createaccount'}>Create Account</Link>
                
            </div>
            <div className="font-bold text-3xl px-2 cursor-pointer border-white border-b-2 md:border-none" >
                <Link to={'/deposit'}>Deposit</Link>
               
            </div>
            <div className="font-bold text-3xl px-2 cursor-pointer border-white border-b-2 md:border-none">
                <Link to={'/withdraw'}>Withdraw</Link>
                
            </div>
           
            <div className="font-bold text-3xl px-2 cursor-pointer border-white border-b-2 md:border-none" >
                <Link to={'/balance'}>Balance</Link>
                
            </div>
        </div>
  )
}

export default Navbar