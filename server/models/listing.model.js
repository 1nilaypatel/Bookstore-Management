import mongoose from 'moongose';

const listingSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    unique: true,
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

const Listing = mongoose.model('User', listingSchema);

export default Listing;