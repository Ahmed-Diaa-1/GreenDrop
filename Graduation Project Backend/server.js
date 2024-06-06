var db = require("./config/dbconfig");
var express = require("express");
var cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  connectionStateRecovery: {}, // handling disconnect ...
});

const cors = require("cors"); // handles cors HTTP requests for the browser
app.use(cors()); //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Welcome!");
});

app.get("/index", function (req, res) {
  res.sendFile("/index.html", { root: __dirname });
});
app.get("/chat", function (req, res) {
  res.sendFile("/chat.html", { root: __dirname });
});

const authRoutes = require("./src/routes/auth.route");
const userRoutes = require("./src/routes/user.route");
const feedbackRoutes = require("./src/routes/feedback.route");
const locationRoutes = require("./src/routes/location.route");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use(
  "/api/location",
  (req, res, next) => {
    req.io = io; // Passes io instance to the route
    next();
  },
  locationRoutes
);
// Chat testing ...
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    let result;
    try {
      result = db.query("INSERT INTO messages (content) VALUES (?)", msg);
    } catch (e) {
      return;
    }
    // include the offset with the message
    io.emit("chat message", msg, result.lastID);
    // io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  if (!socket.recovered) {
    // if the connection state recovery was not successful
    db.query(
      "SELECT id, content FROM messages WHERE id > ?",
      [socket.handshake.auth.serverOffset || 0],
      (err, rows) => {
        if (err) {
          console.error(err);
          return;
        }
        rows.forEach((row) => {
          socket.emit("chat message", row.content, row.id);
        });
        socket.recovered = true;
        if (rows.length > 0) {
          socket.handshake.auth.serverOffset = rows[rows.length - 1].id;
        }

        http: console.log("recovered");
        console.log(socket.handshake.auth.serverOffset);
      }
    );
  }
});
//
server.listen(5000, () => {
  console.log("Port:5000");
});
