import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const BookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        default: () => uuidv4(),
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attractionName: {
        type: String,
        required: true
    },
    attractionLocation: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    visitDate: {
        type: Date,
        required: true
    },
    numberOfVisitors: {
        type: Number,
        required: true,
        default: 1
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'confirmed'
    },
    qrCode: {
        type: String,
        required: true
    }
});

const BookingModel = mongoose.model('Booking', BookingSchema);
export default BookingModel;
