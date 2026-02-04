const express = require("express");
const app = express();

const { PORT, DB_SYNC } = require("./config/serverConfig.js");
const apiRoutes = require("./routes/index.js");
const db = require("./models/index.js");

const setupAndStartServer = () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        if (DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        console.log(`Server Running At Port: ${PORT}`);
    })
}

setupAndStartServer();