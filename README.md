# Flight Booking Discount API

### **Objective**

The goal of this assignment is to build a backend API that calculates discounts on flight bookings based on various offers. The API should accept user input, apply the best possible discount rules, and return the discounted value, total price, and applied offers.

### **Requirements**

1. **Setup the database**
    1. **Database Design:**
        - Use two tables:
            - **flight_bookings Table:** Contains the history of flights taken by that user.
            - **offers Table:** stores all the available offers
    2. **Schema Definition:**
        - **flight_bookings Table:**
            
            ### **Table Representation:**
            
            | Column Name | Data Type | Constraints |
            | --- | --- | --- |
            | `id` | `SERIAL` | Primary Key, Auto-increment |
            | `flight_id` | `INT` | Not Null |
            | `user_id` | `INT` | Not Null |
            | `flight_actual_price` | `DECIMAL(10,2)` | Not Null |
            | `flight_discounted_price` | `DECIMAL(10,2)` | Not Null |
            | `flight_date` | `DATE` | Not Null |
2. **API Development:**
    - Develop a REST API using **Node.js (Express.js) or Python (FastAPI/Flask)**.
    - The API should accept user input in JSON format.
    - Connect to a database NeonDB or SQL, Mongodb.
    1. /discount_calc
        - Based on the rules mentioned below calculate the discount value.
        - use the `flight_bookings` table to identify if the person is new user or an old user
        - add the new request to the `flight_bookings` table and on further api calls for that particular user calculate the discounted value.
        - Expected API Input Example
        
        ```json
        {
          "user_id": 1,
          "flight_id": 456,
          "payment_mode": "HDFC",
          "is_student": true,
          "price": 1000
        }
        
        ```
        
        - Expected API Response Example
        
        ```json
        {
          "user_id": 1,
          "flight_id": 456,
          "original_price": 1000,
          "discount_applied": 200,
          "final_price": 800,
          "offers_applied": ["Introductory Offer", "Student Offer"]
        }
        
        ```
        
3. **Discount Calculation:**
    - Apply one of the following (whichever gives the highest discount):
        1. **Festive Season Offer:** Flat 9% off.
        2. **Introductory Offer:** 11% off for first-time users.
        3. **Frequent Flyer Offer:** 1% off per previous flight booked (capped at 17%).
    - Additionally, apply any of the following, if applicable:
        1. **Payment Mode Offer:** 3% off for HDFC payments.
        2. **Student Offer:** Flat 9% off.

### **Evaluation Criteria**

- Code correctness and readability.
- Efficient database querying.
- Proper API structure and error handling.
- Well-structured and documented code.
