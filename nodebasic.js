const http = require('http');

const TodoList = ["Eat", "Code", "Sleep"];
http.createServer((req, res) => {
    const { method, url } = req;
    if (url === "/todos") {
        if (method === "GET") {
            res.writeHead(200, {
                "Content-type": "text/html"
            })
            res.write(TodoList.toString());
        }
        else
            if (method === "POST") {
                let body = [];
                req
                    .on("error", (error) => {
                        console.error(error);
                    })
                    .on("data", (chunk) => {
                        body.push(chunk);
                        // console.log(chunk);
                    })
                    .on("end", () => {
                        body = Buffer.concat(body).toString();
                        console.log(body);
                        body = JSON.parse(body)
                        TodoList.push(body.item);

                    })
            }
            else
                if (method === "DELETE") {
                    let body = [];
                    req
                        .on("error", (error) => {
                            console.error(error);
                        })
                        .on("data", (chunk) => {
                            body.push(chunk);
                            // console.log(chunk);
                        })
                        .on("end", () => {
                            body = Buffer.concat(body).toString();
                            console.log(body);
                            body = JSON.parse(body)
                            TodoList.find((elem, index) => {
                                if (elem == body.item) {
                                    TodoList.splice(index, 1);
                                }
                            })

                        })
                }
                else
                    res.writeHead(501);
    }
    else
        res.writeHead(401);

    res.end();
}).listen(8081, () => {
    console.log("sever is running");
});
