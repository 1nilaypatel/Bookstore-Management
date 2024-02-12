import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import { BookList, CreateListing, Home, UpdateListing } from './pages';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/book-list"} element={<BookList />} />
          <Route path={"/create-listing"} element={<CreateListing />} />
          <Route path={"/update-listing"} element={<UpdateListing />} />
        </Routes>
      </Router>
    </div>
  )
}
