import app from "./app.module.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running!");
});
