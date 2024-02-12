import express from 'express'
import { createBookListing, deleteBookListing, getBookListing, getListings, updateBookListing } from '../controllers/listing.controller.js';

const router = express.Router();

router.post('/create', createBookListing);
router.get('/get', getListings);
router.get('/get/:id', getBookListing);
router.delete('/delete/:id', deleteBookListing);
router.put('/update/:id', updateBookListing);

export default router;