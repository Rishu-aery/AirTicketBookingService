const { FLIGHT_SERVICE_URL } = require("../config/serverConfig.js");
const { BookingRepository } = require("../repositories/index.js");
const { InternalError } = require("../utils/error-handler.js");
const axios = require("axios");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository()
    }
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightUrl = `${FLIGHT_SERVICE_URL}/api/v1/flight/${flightId}`;
            const flightDetail = (await axios.get(getFlightUrl)).data.data;
            if (!flightDetail) {
                throw new InternalError();
            }
            if (data.bookedSeats > flightDetail.availableSeats) {
                throw new InternalError("Insufficient seats available to complete your booking.");
            }
            const totalCost = flightDetail.price * data.bookedSeats;
            const bookingPayload = {
                ...data,
                totalCost
            }
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightUrl = `${FLIGHT_SERVICE_URL}/api/v1/flight/${flightId}`;
            await axios.patch(updateFlightUrl, {availableSeats: flightDetail.availableSeats - booking.bookedSeats});
            const finalBooking = this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            console.log("server error--------------", error);
            throw error;   
        }
    }
}

module.exports = BookingService;