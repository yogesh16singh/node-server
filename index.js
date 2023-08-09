const express = require("express");

const app = express();
const PORT = process.env.PORT || 8081
app.get("/", (req, res) => {
    res.send("hi");

});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
});