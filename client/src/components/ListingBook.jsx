import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isbn10 from '../assets/isbn.png';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function ListingBook({ book }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Book Listing?");
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`/server/listing/delete/${book._id}`);
      navigate('/book-list');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/book/${book._id}`}>
        <img
          src={book.imageUrls[0] || 'https://via.placeholder.com/150'}
          alt='Gadget cover'
          className='h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {book.title}
          </p>
          <div className='flex items-center gap-1'>
            <span className='text-xs'>by</span>
            <div className='text-sm text-indigo-500'>
              {book.author}
            </div>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {book.description}
          </p>
          <p className='text-slate-800 mt-2 text-xl font-semibold'>
            ₹{book.price}
          </p>
          <div className='flex flex-row gap-3'>
            <img
              src={isbn10}
              className='h-10 w-10'
            />
            <span className='text-sm mr-10 font-semibold'>{book.isbn}</span>
            <Link to={`/update-listing/${book._id}`} className='text-indigo-500 mr-4'><FaPencilAlt /></Link>
            <span className='text-red-500' onClick={() => handleDelete()}><FaTrash /></span>
          </div>
        </div>
      </Link>
    </div>
  );
}
