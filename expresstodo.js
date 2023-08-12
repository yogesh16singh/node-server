const express = require("express");

const app = express();

app.use(express.json())
const PORT = process.env.PORT || 8081


const TodoList = ["Eat", "Code", "Sleep"];
app.get("/", (req, res) => {
    res.status(200).send({
        TodoList: TodoList
    });

});
app.post("/", (req, res) => {
    console.log(req.body.todo);
    TodoList.push(req.body.todo);
    res.status(200).send({
        message: "item added successfully",
    });
})
app.get("/users/:id", (req, res) => {
    const ID = req.params.id;

    res.send({
        id: ID
    });

});


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
});