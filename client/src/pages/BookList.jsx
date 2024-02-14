import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingBook from '../components/ListingBook.jsx';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('/server/listing/get');
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14 p-9">
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book) => <ListingBook key={book._id} book={book} />)
      )}
    </div>
  );
}
