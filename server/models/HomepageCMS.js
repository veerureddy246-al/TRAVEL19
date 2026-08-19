const mongoose = require('mongoose');

const homepageCMSSchema = new mongoose.Schema({
  sectionKey: { type: String, default: 'main_home' },
  heroBadge: { type: String, default: "India's Leading Travel Booking Network" },
  heroHeading: { type: String, default: "Book Flights, Hotels & Holidays at Guaranteed Best Rates" },
  heroSubheading: { type: String, default: "Join over 2.5 Million happy travelers who enjoy zero cancellation penalties, 100% verified hotels, and instant booking vouchers." },
  heroBgImage: { type: String, default: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80" },
  
  whyChooseUs: [
    {
      title: { type: String, default: "Zero Cancellation Fee Options" },
      description: { type: String, default: "100% refund guarantee on selected flight & hotel fares." },
      icon: { type: String, default: "ShieldCheck" }
    },
    {
      title: { type: String, default: "24x7 Customer Care Support" },
      description: { type: String, default: "Round-the-clock dedicated travel concierge team." },
      icon: { type: String, default: "PhoneCall" }
    },
    {
      title: { type: String, default: "100% Verified Stays" },
      description: { type: String, default: "Handpicked 5-star hotels and luxury mountain resorts." },
      icon: { type: String, default: "Hotel" }
    }
  ],

  appPromotion: {
    heading: { type: String, default: "Download Ventoura Mobile App" },
    subheading: { type: String, default: "Get instant fare alerts, offline e-tickets, and app-exclusive ₹1,500 flight discounts." },
    appStoreUrl: { type: String, default: "#" },
    playStoreUrl: { type: String, default: "#" }
  },

  seoTitle: { type: String, default: "Ventoura Travel | Book Flights, Hotels, Bus, Trains & Holiday Packages" },
  seoDescription: { type: String, default: "Book cheap flights, 5-star hotels, luxury holiday packages, and customized tours across India, Kashmir, Goa, and Maldives at best rates." },

  status: { type: String, enum: ['Draft', 'Published', 'Unpublished'], default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.models.HomepageCMS || mongoose.model('HomepageCMS', homepageCMSSchema);
