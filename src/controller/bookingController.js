const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index.js");

const bookingService = new BookingService()

const create = async (req, res) => {
    try {
        const body = req.body;
        const result = await bookingService.createBooking(body);
        res.status(StatusCodes.CREATED).json({
            message: "Booking Successful",
            success: true,
            data: result
        })
    } catch (error) {
        res.status(error.statusCode).json(error);
    }
}

module.exports = {
    create
}