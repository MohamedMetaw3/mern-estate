import mongoose from "mongoose";


const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: String,
    required: true,
  },
  bathrooms: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: String,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  imageUrls: {
    type: Array,
    require: true,
  },
  userRef: {
    type: String,
    required: true,
  },
},{
    timestamps:true
}

);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
