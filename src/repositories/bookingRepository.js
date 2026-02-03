const { ValidationError } = require("../utils/error-handler.js");

class BookingRepository {
    async create(data) {
        try {
            
        } catch (error) {
            throw new ValidationError(error);
        }
    }
}