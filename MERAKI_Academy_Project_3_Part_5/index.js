const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers
//const articleRouter = require("./routes/articles");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const roleRouter = require("./routes/roles");
const commentRouter = require("./routes/comments");
const articleRouter = require("./routes/articles");
const permissionsRouter = require("./routes/permissions");

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/articles", articleRouter);
app.use("/register", registerRouter);
app.use("/roles", roleRouter);
app.use("/login", loginRouter);
app.use("/comments", commentRouter);
app.use("/permissions",permissionsRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
