import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createBookListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(errorHandler(400, error.message));
  }
};

export const getListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getBookListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Book Listing not found!"));
    }
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const updateBookListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) {
      return next(errorHandler(404, "Book Listing not found!"));
    }
    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteBookListing = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Book Listing not found!"));
    }
    return next(errorHandler(200, "Book Listing deleted successfully!"));
  } catch (error) {
    next(error);
  }
};
