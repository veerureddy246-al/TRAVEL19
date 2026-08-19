const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Enquiry received! Our travel concierge will reach out shortly.',
      data: enquiry
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const items = await Enquiry.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
