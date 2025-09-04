import express from "express";
import UserModule from "./modules/users/users.module.js";

import "./config/database/generate.js";

const app = express();

app.use(express.json());

app.use("/api", [UserModule]);

export default app;
