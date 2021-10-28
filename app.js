const express = require("express");
const app = express();
const cors = require("cors");
const { NotFoundError } = require("./helpers/expressError");
const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const usersRoutes = require("./routes/users");
const flashcardsRoutes = require("./routes/flashcards");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);
app.use("/users", usersRoutes);
app.use("/flashcards", flashcardsRoutes);

app.get("/", function (req, res, next) {
  return res.send("Hello Vistor");
})


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
  /** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });



module.exports = app;