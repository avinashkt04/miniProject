import { app } from "./app.js";
import { dbConnect } from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

dbConnect()
  .then(() => {
    app.on("error", (error) => {
      console.log("Server Error: ", error);
    });
    app.listen(process.env.PORT || 8000, () => {console.log(`Server is running at port: ${process.env.PORT}`)});
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!! ", error)
});
