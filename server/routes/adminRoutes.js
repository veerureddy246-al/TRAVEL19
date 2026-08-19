const express = require('express');
const router = express.Router();
const safariController = require('../controllers/safariController');
const { verifyAdmin } = require('../middleware/auth');

router.get('/stats', verifyAdmin, safariController.getAdminStats);
router.get('/bookings', verifyAdmin, safariController.getBookings);
router.get('/enquiries', verifyAdmin, safariController.getEnquiries);

router.post('/:collection', verifyAdmin, safariController.createItem);
router.put('/:collection/:id', verifyAdmin, safariController.updateItem);
router.patch('/:collection/:id', verifyAdmin, safariController.updateItem);
router.delete('/:collection/:id', verifyAdmin, safariController.deleteItem);

module.exports = router;
