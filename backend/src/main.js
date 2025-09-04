import app from "./app.module.js";
import database from "./config/database/database.js";

const PORT = process.env.PORT ?? 3000;

async function start() {
  try {
    await database.connect();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}!`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

start();
