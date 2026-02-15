const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index.js");
const { createChannel, publishMessage } = require("../utils/messageQueue.js");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig.js");

const bookingService = new BookingService()

class BookingController {

    async sendMessageToQueue(req, res) {
        try {
            const channel = await createChannel();
            const payload = {
                data: {
                    subject: "Support Request",
                    content: "Notification created from queue",
                    recipientEmail: "aeryrishab0@gmail.com",
                    NotificationTime: "2026-02-13T06:19:16.251Z"
                },
                service: "CREATE_TICKET"
            }
            publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
            return res.status(200).json({
                message: "Successfully Published the Enent"
            })
        } catch (error) {
            return res.status(500).json({
                err: error,
                message: "Internal Server Error"
            })
        }
    }

    async create(req, res) {
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
}

module.exports = BookingController;