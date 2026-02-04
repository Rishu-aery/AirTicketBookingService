const { ValidationError } = require("../utils/error-handler.js");
const { Booking } = require("../models/index.js");

class BookingRepository {
    async create(data) {
        try {
            const result = Booking.create(data);
            return result;
        } catch (error) {
            throw new ValidationError(error);
        }
    }
}

module.exports = {
    BookingRepository
}