const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    DB_SYNC: process.env.DB_SYNC === "true" ? true : false,
    FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
    MESSAGE_BROCKER_URL: process.env.MESSAGE_BROCKER_URL,
    QUEUE_NAME: process.env.QUEUE_NAME
}