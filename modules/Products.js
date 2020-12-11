const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    price: {
        type: Number,
    }
});

module.exports = mongoose.model("Products", ProductSchema);