const pool = require('./db');

const createTables = async () => {
  try {
    // Create flight_bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS flight_bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        flight_id INT NOT NULL,
        user_id INT NOT NULL,
        flight_actual_price DECIMAL(10,2) NOT NULL,
        flight_discounted_price DECIMAL(10,2) NOT NULL,
        flight_date DATE NOT NULL
      ) ENGINE=InnoDB;
    `);
    
    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
};

// Run the function
createTables(); 






