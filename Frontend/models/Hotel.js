import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Luxury', 'Budget', 'Homestay', 'Mid-range']
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    amenities: [{
        type: String
    }],
    imageUrl: {
        type: String
    }
});

const HotelModel = mongoose.model('Hotel', HotelSchema);
export default HotelModel;
