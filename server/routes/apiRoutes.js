const express = require('express');
const router = express.Router();

const safariController = require('../controllers/safariController');
const authController = require('../controllers/authController');
const destinationController = require('../controllers/destinationController');
const packageController = require('../controllers/packageController');
const hotelController = require('../controllers/hotelController');
const galleryController = require('../controllers/galleryController');
const bookingController = require('../controllers/bookingController');
const enquiryController = require('../controllers/enquiryController');
const cmsController = require('../controllers/cmsController');
const { verifyAdmin } = require('../middleware/auth');

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

// Public Content Endpoints (Dynamic MongoDB & Fallback Data)
router.get('/destinations', destinationController.getDestinations);
router.get('/destination', destinationController.getDestinations);
router.get('/gallery', galleryController.getGallery);
router.get('/hotels', hotelController.getHotels);
router.get('/packages', packageController.getPackages);
router.get('/package/:id', packageController.getPackageById);
router.get('/categories', cmsController.getCategories);
router.get('/cms', cmsController.getHomepageCMS);
router.get('/itinerary', safariController.getItinerary);
router.get('/wildlife', safariController.getWildlife);
router.get('/activities', safariController.getActivities);
router.get('/reviews', safariController.getReviews);
router.get('/faqs', safariController.getFAQs);

// Public Submissions
router.post('/bookings', bookingController.createBooking);
router.post('/enquiries', enquiryController.createEnquiry);
router.post('/reviews', safariController.createReview);

// Admin Dedicated Routes
router.get('/admin/stats', verifyAdmin, safariController.getAdminStats);
router.get('/admin/bookings', verifyAdmin, safariController.getBookings);
router.get('/admin/enquiries', verifyAdmin, safariController.getEnquiries);
router.post('/admin/packages/:id/duplicate', verifyAdmin, packageController.duplicatePackage);
router.patch('/admin/packages/:id/publish', verifyAdmin, packageController.togglePublishStatus);
router.put('/admin/cms', verifyAdmin, cmsController.updateHomepageCMS);
router.post('/admin/categories', verifyAdmin, cmsController.createCategory);
router.put('/admin/categories/:id', verifyAdmin, cmsController.updateCategory);
router.delete('/admin/categories/:id', verifyAdmin, cmsController.deleteCategory);

// Universal REST CRUD for Admin (GET, POST, PUT, DELETE, PATCH)
router.post('/admin/:collection', verifyAdmin, safariController.createItem);
router.put('/admin/:collection/:id', verifyAdmin, safariController.updateItem);
router.patch('/admin/:collection/:id', verifyAdmin, safariController.updateItem);
router.delete('/admin/:collection/:id', verifyAdmin, safariController.deleteItem);

module.exports = router;
