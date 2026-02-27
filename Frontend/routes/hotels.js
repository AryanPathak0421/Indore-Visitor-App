import express from 'express';
import Hotel from '../models/Hotel.js';

const router = express.Router();

// Get all hotels
router.get('/', async (req, res) => {
    try {
        const { type, search } = req.query;
        
        let filter = {};
        
        if (type && type !== 'All') {
            filter.type = type;
        }
        
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const hotels = await Hotel.find(filter).sort({ rating: -1 });
        
        res.json({ hotels });

    } catch (error) {
        console.error('Get hotels error:', error);
        res.status(500).json({ message: 'Server error fetching hotels' });
    }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json({ hotel });

    } catch (error) {
        console.error('Get hotel error:', error);
        res.status(500).json({ message: 'Server error fetching hotel' });
    }
});

// Add new hotel (admin)
router.post('/', async (req, res) => {
    try {
        const { name, type, location, price, rating, description, amenities, imageUrl } = req.body;

        const newHotel = new Hotel({
            name,
            type,
            location,
            price,
            rating,
            description,
            amenities: amenities || [],
            imageUrl
        });

        await newHotel.save();

        res.status(201).json({
            message: 'Hotel added successfully',
            hotel: newHotel
        });

    } catch (error) {
        console.error('Add hotel error:', error);
        res.status(500).json({ message: 'Server error adding hotel' });
    }
});

// Update hotel rating
router.patch('/:id/rating', async (req, res) => {
    try {
        const { rating } = req.body;
        
        if (!rating || rating < 0 || rating > 5) {
            return res.status(400).json({ message: 'Invalid rating. Must be between 0 and 5.' });
        }

        const hotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { rating },
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.json({
            message: 'Rating updated successfully',
            hotel
        });

    } catch (error) {
        console.error('Update rating error:', error);
        res.status(500).json({ message: 'Server error updating rating' });
    }
});

export default router;
