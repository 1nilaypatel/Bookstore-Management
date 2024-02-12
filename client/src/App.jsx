import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Appbar from './components/Appbar.jsx';
import BookList from './pages/BookList.jsx';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <div>
      <Router>
        <Appbar/>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/book-list"} element={<BookList />} />
        </Routes>
      </Router>
    </div>
  )
}
