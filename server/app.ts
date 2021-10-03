import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { routes } from "./routes";
import NotFoundError from "./errors/not-found";
import { errorHandler } from "./middleware/error-handler";
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// Use cookie session
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);

// Use Routes
app.use("/api", routes);

app.get("*", () => {
  throw new NotFoundError();
});
/**
 * Using the error handler middleware capable of handling custom errors
 */
app.use(errorHandler);
export { app };
