const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: booking._id,
      data: booking
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    return res.json({ success: true, data: booking });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: booking });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
