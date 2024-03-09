import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();


// Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("It works");
});




// Middleware for handling CORS
// Option 1: Allow All Origins with default of cors(*)
//app.use(cors());

// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
)





// Routes
app.use("/books", booksRoute);



// Connect to MongoDB
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });