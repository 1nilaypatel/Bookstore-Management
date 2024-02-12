import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    required: true,
  },
  author:{
    type: String,
    required: true,
  },
  isbn:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  imageUrls:{
    type: Array,
    required: true,
  },
}, 
{timestamps: true});

const Listing = mongoose.model('Books', listingSchema);

export default Listing;