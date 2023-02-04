import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='w-full flex flex-row items-center justify-between bg-slate-500 p-4 rounded shadow' >
      <Link href={'/'} >
        Navbar
      </Link>
      <Link href={'/listTicket'} >
        <p>List a ticket</p>
      </Link>
    </div>
  )
}

export default Navbar