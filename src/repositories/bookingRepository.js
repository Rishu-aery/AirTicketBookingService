const { ValidationError } = require("../utils/error-handler.js");
const { Booking } = require("../models/index.js");

class BookingRepository {
    async create(data) {
        try {
            const result = await Booking.create(data);
            return result;
        } catch (error) {
            throw new ValidationError(error);
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookingRepository