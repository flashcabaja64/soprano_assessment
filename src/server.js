const app = require("./app");
const connectDB = require('./db');

connectDB();

app.listen(8080, () => {
    console.log("Runnning on " + 8080);
});
