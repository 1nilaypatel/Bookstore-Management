import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import { BookById, BookList, CreateListing, Home, UpdateListing } from './pages';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={"/"} element={<BookList />} />
          <Route path={"/book-list"} element={<BookList />} />
          <Route path={"/create-listing"} element={<CreateListing />} />
          <Route path={"/update-listing/:id"} element={<UpdateListing />} />
          <Route path={"/book/:id"} element={<BookById />} />
        </Routes>
      </Router>
    </div>
  )
}
