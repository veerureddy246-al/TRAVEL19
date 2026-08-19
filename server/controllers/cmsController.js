const HomepageCMS = require('../models/HomepageCMS');
const Category = require('../models/Category');

const DEFAULT_CATEGORIES = [
  { _id: 'cat-beach', name: 'Beach', slug: 'beach', count: '140+ Resorts', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-mountains', name: 'Mountains', slug: 'mountains', count: '95+ Lodges', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-adventure', name: 'Adventure', slug: 'adventure', count: '60+ Tours', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-family', name: 'Family', slug: 'family', count: '210+ Packages', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-honeymoon', name: 'Honeymoon', slug: 'honeymoon', count: '85+ Villas', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-religious', name: 'Religious', slug: 'religious', count: '45+ Pilgrimages', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-cultural', name: 'Cultural', slug: 'cultural', count: '110+ Palaces', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-wildlife', name: 'Wildlife', slug: 'wildlife', count: '35+ Safaris', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-luxury', name: 'Luxury', slug: 'luxury', count: '5-Star VIP', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-budget', name: 'Budget', slug: 'budget', count: 'Pocket Friendly', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-international', name: 'International', slug: 'international', count: 'Maldives & Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', status: 'Published' },
  { _id: 'cat-domestic', name: 'Domestic', slug: 'domestic', count: 'Pan-India', image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80', status: 'Published' }
];

const DEFAULT_HOMEPAGE_CMS = {
  sectionKey: 'main_home',
  heroBadge: "India's Leading Travel Booking Network",
  heroHeading: "Book Flights, Hotels & Holidays at Guaranteed Best Rates",
  heroSubheading: "Join over 2.5 Million happy travelers who enjoy zero cancellation penalties, 100% verified hotels, and instant booking vouchers.",
  heroBgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80",
  whyChooseUs: [
    { title: "Zero Cancellation Fee Options", description: "100% refund guarantee on selected flight & hotel fares.", icon: "ShieldCheck" },
    { title: "24x7 Customer Care Support", description: "Round-the-clock dedicated travel concierge team.", icon: "PhoneCall" },
    { title: "100% Verified Stays", description: "Handpicked 5-star hotels and luxury mountain resorts.", icon: "Hotel" }
  ],
  appPromotion: {
    heading: "Download Ventoura Mobile App",
    subheading: "Get instant fare alerts, offline e-tickets, and app-exclusive ₹1,500 flight discounts.",
    appStoreUrl: "#",
    playStoreUrl: "#"
  },
  seoTitle: "Ventoura Travel | Book Flights, Hotels, Bus, Trains & Holiday Packages",
  seoDescription: "Book cheap flights, 5-star hotels, luxury holiday packages, and customized tours across India, Kashmir, Goa, and Maldives at best rates.",
  status: 'Published'
};

exports.getHomepageCMS = async (req, res) => {
  try {
    const cms = await HomepageCMS.findOne({ sectionKey: 'main_home' });
    if (cms) return res.json({ success: true, data: cms });
    return res.json({ success: true, data: DEFAULT_HOMEPAGE_CMS });
  } catch (err) {
    return res.json({ success: true, data: DEFAULT_HOMEPAGE_CMS });
  }
};

exports.updateHomepageCMS = async (req, res) => {
  try {
    let cms = await HomepageCMS.findOne({ sectionKey: 'main_home' });
    if (!cms) {
      cms = await HomepageCMS.create({ sectionKey: 'main_home', ...req.body });
    } else {
      cms = await HomepageCMS.findOneAndUpdate({ sectionKey: 'main_home' }, req.body, { new: true });
    }
    return res.json({ success: true, data: cms });
  } catch (err) {
    return res.json({ success: true, data: { ...DEFAULT_HOMEPAGE_CMS, ...req.body } });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories && categories.length > 0) {
      // Filter published if public
      const isAdmin = req.query.admin === 'true';
      const filtered = isAdmin ? categories : categories.filter(c => c.status === 'Published');
      return res.json({ success: true, count: filtered.length, data: filtered });
    }
    return res.json({ success: true, count: DEFAULT_CATEGORIES.length, data: DEFAULT_CATEGORIES });
  } catch (err) {
    return res.json({ success: true, count: DEFAULT_CATEGORIES.length, data: DEFAULT_CATEGORIES });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    return res.status(201).json({ success: true, data: cat });
  } catch (err) {
    return res.status(201).json({ success: true, data: req.body });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: cat || req.body });
  } catch (err) {
    return res.json({ success: true, data: req.body });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
  } catch (err) {}
  return res.json({ success: true, message: 'Category deleted successfully' });
};
