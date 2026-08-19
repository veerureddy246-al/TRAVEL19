// AI Trip Planner & Recommendation Engine Controller

exports.generateItinerary = async (req, res) => {
  try {
    const { destination, days, budget, interests, travelers } = req.body;

    const daysCount = parseInt(days) || 5;
    const numTravelers = parseInt(travelers) || 2;

    const itinerary = [];
    const activitiesPool = [
      { morning: 'Private sunrise photography & champagne breakfast', afternoon: 'Guided cultural heritage tour & local artisan workshops', evening: 'Exclusive rooftop dinner with panoramic sunset views' },
      { morning: 'Scenic helicopter tour or yacht coastal cruise', afternoon: 'VIP wine tasting & culinary masterclass with Michelin chef', evening: 'Stargazing excursion & private lounge relaxation' },
      { morning: 'Nature wildlife safari / hiking secret trails', afternoon: 'Luxury thermal spa & wellness hydrotherapy package', evening: 'Live cultural performance & signature cocktail tasting' },
      { morning: 'Deep-sea diving / coral reef snorkeling', afternoon: 'Island hopping excursion with private speedboat', evening: 'Seafood beach barbeque under moonlight' },
      { morning: 'Historical museum VIP tour & architectural walk', afternoon: 'Bespoke boutique shopping & artisan market visit', evening: 'Sunset catamaran cruise & live jazz music' }
    ];

    for (let i = 1; i <= daysCount; i++) {
      const act = activitiesPool[(i - 1) % activitiesPool.length];
      itinerary.push({
        day: i,
        title: `Day ${i}: ${destination || 'Exotic Paradise'} Signature Exploration`,
        morning: act.morning,
        afternoon: act.afternoon,
        evening: act.evening,
        recommendedHotel: `Grand ${destination || 'Resort'} Palace & Spa 5★`
      });
    }

    const estimatedCostTotal = (parseInt(budget) || 2500) * (numTravelers / 1.5);
    const packingChecklist = [
      'Universal power adapters & fast chargers',
      'Passport & e-Visa document copies',
      'Breathable linen apparel & swimwear',
      'Polarized sunglasses & eco SPF 50 sunscreen',
      'Action camera & waterproof dry bag',
      'Travel insurance policy & digital passes'
    ];

    res.status(200).json({
      success: true,
      data: {
        destination: destination || 'Tropical Luxury Haven',
        durationDays: daysCount,
        budgetEstimated: `$${Math.round(estimatedCostTotal).toLocaleString()}`,
        interests: interests || ['Luxury', 'Culture', 'Culinary'],
        itinerary,
        packingChecklist,
        hotelOptions: [
          { name: `The Ritz Ritz Premier ${destination}`, rating: 5, pricePerNight: '$450' },
          { name: `Aman Luxury Villas ${destination}`, rating: 5, pricePerNight: '$820' },
          { name: `Four Seasons Haven ${destination}`, rating: 5, pricePerNight: '$610' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
