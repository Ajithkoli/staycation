const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "default-image"
    },
    url: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.instagram.com%2Fmarvelous_belgaum%2Fp%2FCYq5Y4gB6qZ%2F%3Flocale%3Den-GB&psig=AOvVaw1cGfRwG7mXM4N_d6MdlNhq&ust=1747588468092000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICuusCAq40DFQAAAAAdAAAAABAE",
      set: v => v === "" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.instagram.com%2Fmarvelous_belgaum%2Fp%2FCYq5Y4gB6qZ%2F%3Flocale%3Den-GB&psig=AOvVaw1cGfRwG7mXM4N_d6MdlNhq&ust=1747588468092000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICuusCAq40DFQAAAAAdAAAAABAE" : v
    }
  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
