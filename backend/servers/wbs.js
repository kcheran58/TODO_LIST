// app.js
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const logEvents = require("../middleware/logEvents");
const {connectDB} = require("./db_connection");
connectDB();
app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, './public')));
app.use('/subdir', express.static(path.join(__dirname, './public')));
app.use('/', require("../routes/root"));
app.use('/subdir', require("../routes/subdir"));
app.use('/employees', require("../routes/api/employee"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
