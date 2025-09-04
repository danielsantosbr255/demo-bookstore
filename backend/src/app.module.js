import express from "express";
import UserModule from "./modules/users/users.module.js";

class AppModule {
  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use("/api", [UserModule]);

    this.app.use((req, res) => {
      res.status(404).json({ message: "Route not found!" });
    });
  }

  listen(port, callback) {
    this.app.listen(port, callback);
  }
}

export default new AppModule();
