'use strict';

import sequelize from '../config/database.config.js';
import User from '../models/user.model.js';
import Location from '../models/location.model.js';
import Company from '../models/company.models.js';
import Bus from '../models/bus.model.js';
import Booking from '../models/booking.models.js';
import Payment from '../models/payment.models.js';
import QRCodeModel from '../models/qr_code.models.js';
import associateModels from '../models/associateModels.js';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Sync all models
      associateModels();
      await sequelize.sync({ force: true });

      // Create Users
      const user1 = await User.create({
        id: 'user-uuid-1',
        email: 'user1@example.com',
        username: 'user1',
        password: 'password1',
        role: 'passenger',
      });

      const user2 = await User.create({
        id: 'user-uuid-2',
        email: 'user2@example.com',
        username: 'user2',
        password: 'password2',
        role: 'driver',
      });

      // Create Locations
      await Location.create({
        id: 'location-uuid-1',
        longitude: 40.7128,
        latitude: -74.0060,
        userId: user1.id,
        type: 'passenger',
      });

      await Location.create({
        id: 'location-uuid-2',
        longitude: 34.0522,
        latitude: -118.2437,
        userId: user2.id,
        type: 'driver',
      });

      // Create Companies
      const company1 = await Company.create({
        id: 'company-uuid-1',
        name: 'Company One',
        contactInfo: 'contact@companyone.com',
      });

      // Create Buses
      const bus1 = await Bus.create({
        id: 'bus-uuid-1',
        companyId: company1.id,
        capacity: 50,
        electric: false,
      });

      // Create Bookings
      const booking1 = await Booking.create({
        id: 'booking-uuid-1',
        userId: user1.id,
        busId: bus1.id,
        departureLocation: 'New York',
        arrivalLocation: 'Boston',
        departureDate: '2023-12-01',
        departureTime: '08:00:00',
        paymentStatus: 'completed',
      });

      // Create Payments
      const payment1 = await Payment.create({
        id: 'payment-uuid-1',
        bookingId: booking1.id,
        amount: 100.00,
        paymentMethod: 'cash',
        paymentStatus: 'completed',
      });

      // Create QR Codes
      await QRCodeModel.create({
        id: 'qrcode-uuid-1',
        paymentId: payment1.id,
        qrCodeImage: 'data:image/png',
      });

      console.log('All models have been seeded');
    } catch (error) {
      console.error('Error seeding all models:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('QRCode', null, {});
      await queryInterface.bulkDelete('Payment', null, {});
      await queryInterface.bulkDelete('Booking', null, {});
      await queryInterface.bulkDelete('Bus', null, {});
      await queryInterface.bulkDelete('Company', null, {});
      await queryInterface.bulkDelete('Location', null, {});
      await queryInterface.bulkDelete('User', null, {});
    } catch (error) {
      console.error('Error reverting seed:', error);
    }
  }
};