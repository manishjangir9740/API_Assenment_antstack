const FlightBooking = require('../models/FlightBooking');

class DiscountService {
  static async calculateDiscount(bookingData) {
    const { user_id, flight_id, payment_mode, is_student, price } = bookingData;

    // Get user's booking history
    const userBookings = await FlightBooking.getBookingsByUserId(user_id);
    const isFirstTimeUser = userBookings.length === 0;
    
    console.log('User Bookings:', userBookings.length);
    console.log('Is First Time User:', isFirstTimeUser);

    // Calculate base discounts
    const discounts = [
      { name: 'Festive Season Offer', value: price * 0.09 },
      { name: 'Introductory Offer', value: isFirstTimeUser ? price * 0.11 : 0 },
      { 
        name: 'Frequent Flyer Offer', 
        value: Math.min(userBookings.length * 0.01, 0.17) * price 
      }
    ];

    console.log('Available Discounts:', discounts);

    // Get the highest base discount
    const baseDiscount = discounts.reduce((max, current) => 
      current.value > max.value ? current : max
    );

    console.log('Selected Base Discount:', baseDiscount);

    // Calculate additional discounts
    let totalDiscount = baseDiscount.value;
    const appliedOffers = [baseDiscount.name];

    // Payment mode discount
    if (payment_mode === 'HDFC') {
      totalDiscount += price * 0.03;
      appliedOffers.push('Payment Mode Offer');
    }

    // Student discount
    if (is_student) {
      totalDiscount += price * 0.09;
      appliedOffers.push('Student Offer');
    }

    console.log('Total Discount:', totalDiscount);
    console.log('Applied Offers:', appliedOffers);

    const finalPrice = price - totalDiscount;

    // Save the booking
    await FlightBooking.create({
      flight_id,
      user_id,
      flight_actual_price: price,
      flight_discounted_price: finalPrice,
      flight_date: new Date()
    });

    return {
      user_id,
      flight_id,
      original_price: price,
      discount_applied: totalDiscount,
      final_price: finalPrice,
      offers_applied: appliedOffers
    };
  }
}

module.exports = DiscountService; 