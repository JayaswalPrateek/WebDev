import express from "express";
import path from "path";
import url from "url";

const app = express();
const PORT = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url) // file://<> -> <>
const __dirname = path.dirname(__filename)

app.get("/text", (request, response) => response.send("Hello World"))
app.get("/html", (request, response) => response.send("<h1>Hello World</h1>"))
app.get("/json", (request, response) => response.send({ message: "Hello World" })) // not the idomatic way to send json
app.get("/html/file", (request, response) => response.sendFile(path.join(__dirname, "public", "index.html")))
// .sendFile() doesn't scale well for too many files
// in which case, we can use express static middleware
// ie making a folder(here, public) as a static folder
// so that if that folder has foo.html, we dont need to
// create the route /foo to serve foo.html and instead
// if the url has the route /foo.html then foo.html file
// will be served automatically without having to create
// an explicit route for it:
app.use(express.static(path.join(__dirname, 'public')))
// so http://localhost:8000/index.html works just like
// http://localhost:8000/html/file did

let jsonData = [
    { id: 1, title: "foo" },
    { id: 2, title: "bar" },
    { id: 3, title: "baz" }
]
// the idiomatic way to send json is to use .json() instead of .send():
app.get("/api/json/all", (request, response) => {
    response.json(jsonData)
})
// We can chain the status code of the response before its sent.
// to get a single post by its id, we use :id inside the route
// which is available as a string inside request.params object
app.get("/api/json/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const result = jsonData.find(item => item.id === id)
    if (result)
        return response.status(200).json(result)
    // else not needed as we return in if block
    response.status(404).send("<h1>404 - Not Found</h1>")
})
// limiting response size by specifying it as a query:
// http://localhost:8000/api/json/limit/all?limit=2
// should only send a response with 2 or less entires
// WARNING: COULD BE AN INJECTION ATTACK INSTEAD OF '2'
// such queries in the url are stored as a string in
// request.query object.
app.get("/api/json/limit/all", (request, response) => {
    const limit = parseInt(request.query.limit)
    if (!isNaN(limit) && limit > 0) return response.status(200).json(jsonData.slice(0, limit))
    response.status(200).json(jsonData)
})

app.listen(8000, () => console.log(`Server Running on Port ${PORT}`));
