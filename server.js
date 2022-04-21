const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const { authenticate } = require("./middlewares/jwt.middleware");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", authenticate, userRoute);
app.use("/posts", authenticate, postRoute);

app.listen(process.env.PORT);