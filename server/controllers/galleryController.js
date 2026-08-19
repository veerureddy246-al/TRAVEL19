const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category && category !== 'all') {
      filter.category = new RegExp(category, 'i');
    }
    const items = await Gallery.find(filter);
    return res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    return res.json({ success: true, count: 0, data: [] });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.create(req.body);
    return res.status(201).json({ success: true, data: item });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};
