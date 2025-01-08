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

import router from "./routes/mockJsonData.js"; // middleware
// to use this imported middleware:
app.use("/api/json", router)

app.listen(8000, () => console.log(`Server Running on Port ${PORT}`));
