const db = require('../config/db');

class FlightBooking {
  static async create(booking) {
    const { flight_id, user_id, flight_actual_price, flight_discounted_price, flight_date } = booking;
    const query = `
      INSERT INTO flight_bookings 
      (flight_id, user_id, flight_actual_price, flight_discounted_price, flight_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [flight_id, user_id, flight_actual_price, flight_discounted_price, flight_date];
    const [result] = await db.query(query, values);
    return result.insertId;
  }

  static async getBookingsByUserId(userId) {
    const query = 'SELECT * FROM flight_bookings WHERE user_id = ?';
    const [rows] = await db.query(query, [userId]);
    return rows;
  }
}

module.exports = FlightBooking; 