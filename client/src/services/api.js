import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Interceptor to attach JWT Token to requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('ventoura_token') || localStorage.getItem('serengeti_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchDestinations = async () => (await API.get('/destinations')).data;
export const fetchPackages = async () => (await API.get('/packages')).data;
export const fetchHotels = async () => (await API.get('/hotels')).data;
export const fetchGallery = async (category = 'All') => (await API.get(`/gallery?category=${category}`)).data;
export const fetchItinerary = async () => (await API.get('/itinerary')).data;
export const fetchReviews = async () => (await API.get('/reviews')).data;
export const fetchFAQs = async () => (await API.get('/faqs')).data;

export const createBooking = async (bookingData) => (await API.post('/bookings', bookingData)).data;
export const createEnquiry = async (enquiryData) => (await API.post('/enquiries', enquiryData)).data;
export const createReview = async (reviewData) => (await API.post('/reviews', reviewData)).data;

export const fetchAdminStats = async () => (await API.get('/admin/stats')).data;

export default API;
