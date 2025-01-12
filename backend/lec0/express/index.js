import express from "express"
import path from "path"
import url from "url"

const app = express()
const PORT = process.env.PORT
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

// templating using EJS
// configure app to use EJS:
app.set("view engine", "ejs")
app.set("views", "views") // all the views will be in the views directory
// due to this template engine, we get the access to .render() in the response object
app.get("/viewsDemo", (request, response) => response.render("viewsDemo", {
    title: "Dynamically Sent Mesaage",
    message: "This message was dynamically passed to the ejs template while rendering",
    list: ["foo", "bar", "baz"]
}))
// will render /views/viewsDemo.ejs on GET request at http://localhost:8001/viewsDemo
// we can also pass some data to the template that is dynamically inserted in it
// suppose there are multiple view ejs pages and each one has a common footer then
// instead of having to specify it in each ejs file, we can instead create that footer
// as a partial in a directory called partial which contains all the reusable elements
// and then they need to be imported into the ejs file where they can be rendered without
// explicitly having write them again and again.

import router from "./routes/mockJsonData.js" // middleware

// body parser middleware to read the body of the POST request:
app.use(express.json()) // (a) for raw json parsing support
app.use(express.urlencoded({ extended: false })) // (b) for x-www-form-urlencoded parsing support

import logger from "./middleware/logger.js"
app.use(logger)

// to use this imported middleware:
app.use("/api/json", router) // must come after middlewares: (a) and (b) ie at the end

import errorHandler from "./middleware/errorHandler.js"
// app.use(errorHandler)
// this is not a catch all error handling middleware
// so it will only work on the routes that use it internally

// so it cant be used if an invalid route is triggered, so we
// need an app level catch all error handling middleware:
app.use((request, response, nextMiddleware) => { // can be moved to a seperate file
    const error = new Error("404 - Not Found")
    error.status = 404
    nextMiddleware(error)
}) // this is sent to app.use(errorHandler)

app.use(errorHandler)

app.listen(8000, () => console.log(`Server Running on Port ${PORT}`))
