const { FLIGHT_SERVICE_URL } = require("../config/serverConfig.js");
const { InternalError } = require("../utils/error-handler.js");
const axios = require("axios");

class BookingService {
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightUrl = `${FLIGHT_SERVICE_URL}/api/v1/flight/${flightId}`;
            const flight = await axios.get(getFlightUrl);
            return flight.data.data;
        } catch (error) {
            throw new InternalError("Internal Server Error!", error);   
        }
    }
}

module.exports = BookingService;