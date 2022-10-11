const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRouter = require("./Routes/UserRoutes");
const imageRouter = require("./Routes/ImageRoutes");
const videoRouter = require("./Routes/VideoRoutes");
const Database = require("./System/Database");
const config = require("./config");

const app = express();

Database.connect(config.database);
app.use(cors({
    origin: config.clientUrl,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(userRouter);
app.use(imageRouter);
app.use(videoRouter);

app.listen(config.port, function () {
    console.log(`listening on port ${config.port}`);
});