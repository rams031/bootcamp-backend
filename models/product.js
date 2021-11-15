const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { 
        type: String,
        unique: true
    },
    price: Number,
    quantity: Number,
    description: String,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports =  mongoose.model('Product', ProductSchema)

ProductSchema.pre('save', function(next) {
    if (this.stock > 0) {
        next();
    } else {
        console.log("unsufficient order");
    }
});