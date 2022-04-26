const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
const { authenticate } = require("./middlewares/jwt.middleware");


mongoose.connect(process.env.MONGO_DB_URL);

const app = express();
app.use(cors());
app.use(express.json());

const authRoute = require("./routes/auth.routes");
app.use("/auth", authRoute);

/*
const userRoute = require("./routes/user.routes");
app.use("/users", authenticate, userRoute);
*/
const postRoute = require("./routes/post.routes");
app.use("/posts", authenticate, postRoute);

app.listen(process.env.PORT);