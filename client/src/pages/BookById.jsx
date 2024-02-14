import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import isbn10 from '../assets/isbn.png';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import axios from 'axios';

export default function BookById() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  SwiperCore.use([Navigation]);

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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/server/listing/get/${id}`);
          if (response.ok === false) {
            setError("Failed to fetch Book details");
            setLoading(false);
            return;
          }
          const data = await response.json();
          setBook(data);
          setLoading(false);
          setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <p className='font-medium sm:font-semibold mt-5'>Loading...</p>;
  }

  if (error) {
    return <p className='text-red-500 font-medium sm:font-semibold mt-5'>Error: {error}</p>;
  }

  return (
    <div className='mt-16'>
      <div className='flex flex-col lg:flex-row p-8 md:p-28 gap-10'>
        <div className="w-[400px]"> {/* Adjust this width as per your layout */}
          <Swiper navigation className='custom-swiper' loop={true}>
            {book.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <img 
                  src={url} 
                  alt={`Image ${index + 1}`} 
                  className='h-96 w-96 object-contain rounded-lg'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-4">{book.title}</h2>
          <p className="text-gray-600 mb-4">{book.description}</p>
          <p className="text-2xl font-medium mb-6">₹{book.price}</p>
          <div className='flex flex-row items-center gap-6'>
            <div>
              <img
                src={isbn10}
                className='h-10 w-10 text-center'
              />
              <span className='text-sm mr-10 font-semibold'>{book.isbn}</span>
            </div>
            <Link to={`/update-listing/${book._id}`} className='text-indigo-500 mr-4'><FaPencilAlt /></Link>
            <span className='text-red-500' onClick={() => handleDelete()}><FaTrash /></span>
          </div>
        </div>
      </div>
    </div>
  )
}
