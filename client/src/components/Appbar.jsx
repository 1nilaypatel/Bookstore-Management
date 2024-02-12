import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Appbar() {
  return (
    <header className='bg-slate-600 shadow-md fixed top-0 w-full z-50'>
      <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <Link to='/'>
          <h1 className='flex font-bold text-xl sm:text-2xl'>
            <span className='text-slate-50'>Book</span>
            <span className='text-slate-200'>Store</span>
          </h1>
        </Link>
        <ul className='flex flex-row justify-center items-center gap-4'>
          <Link to='/create-listing'>
            <BsPlus className='text-white mr-1 cursor-pointer' size={35} />
          </Link>
          <Link to='/book-list'>
            <li className='text-slate-800 hover:underline bg-indigo-300 px-2 py-1 rounded-full'>
              Books Listing
            </li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
