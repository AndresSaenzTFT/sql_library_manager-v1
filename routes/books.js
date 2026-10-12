var express = require("express");
var createError = require("http-errors");
var router = express.Router();

//access the model book
const Book = require("../models").Book;

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

//route /books is declared on app.js. any otherroute i declare, i dont need to type /books to declare the route

//show books
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [["year", "DESC"]] }); //get all the books from db
    res.render("index", { books, title: "Library Database!" });
  }),
);

router.get(
  "/new",
  asyncHandler(async (req, res) => {
    res.render("new-book", { book: {} });
  }),
);

router.post(
  "/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("new-book", {
          book,
          errors: error.errors,
        });
      } else {
        throw error;
      }
    }
  }),
);

//display each book
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book });
    } else {
      throw createError(
        404,
        "Sorry! We couldn't find the book you were looking for.",
      );
    }
  }),
);

router.post(
  "/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/");
      } else {
        throw createError(
          404,
          "Sorry! We couldn't find the book you were looking for.",
        );
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("update-book", {
          book,
          errors: error.errors,
        });
      } else {
        throw error;
      }
    }
  }),
);

router.post(
  "/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/");
    } else {
      throw createError(
        404,
        "Sorry! We couldn't find the book you were looking for.",
      );
    }
  }),
);

module.exports = router;
