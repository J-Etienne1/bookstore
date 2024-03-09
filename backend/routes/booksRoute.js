import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

// Route for Saving a new Book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "All fields are required",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Route for getting all books from MongoDB
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get an individual book by ID from MongoDB
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Update a Book
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updates = request.body;

    // Validate if any update fields are provided
    if (Object.keys(updates).length === 0) {
      return response.status(400).send({ message: "No update data provided" });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBook) {
      return response.status(404).send({ message: "Book not found" });
    }

    return response.status(200).send(updatedBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a Book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
