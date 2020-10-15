import express from "express";
import {routes} from "./routes"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use Routes
app.use("/api", routes);

export { app };
