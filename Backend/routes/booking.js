import express from 'express';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import Booking from '../models/Booking.js';
import { verifyToken } from '../utils/jwt.js';

const router = express.Router();

// Create new booking
router.post('/create', async (req, res) => {
    try {
        const { attractionName, attractionLocation, visitDate, numberOfVisitors, totalPrice } = req.body;
        
        // Get token from header
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify token and get user ID
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Generate QR code data
        const bookingData = {
            bookingId: uuidv4(),
            attractionName,
            attractionLocation,
            visitDate,
            numberOfVisitors,
            totalPrice
        };

        // Generate QR code
        const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(bookingData));

        // Create booking
        const newBooking = new Booking({
            userId,
            attractionName,
            attractionLocation,
            visitDate: new Date(visitDate),
            numberOfVisitors,
            totalPrice,
            qrCode: qrCodeDataUrl
        });

        await newBooking.save();

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Server error during booking' });
    }
});

// Get user bookings
router.get('/my-bookings', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);
        const userId = decoded.userId;

        const bookings = await Booking.find({ userId }).sort({ bookingDate: -1 });
        
        res.json({ bookings });

    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ message: 'Server error fetching bookings' });
    }
});

// Get booking by ID
router.get('/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        
        const booking = await Booking.findOne({ bookingId });
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ booking });

    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ message: 'Server error fetching booking' });
    }
});

export default router;
