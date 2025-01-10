import express from "express"

// here we need to use a router
const router = express.Router()
// we use it instead of app from express()
// also if all routes share a common prefix
// like /api/json then it can be abstracted
// away and specified only once at the time
// of router.use(prefixStr, importedRouter)

// const loggerMiddleware = (request, response, nextMiddleware) => {
//     console.log(`Logger: ${request.method} ${request.protocol}://${request.get('host')}${request.originalUrl}`)
//     nextMiddleware()
// }
// to use this middleware at the route level we can pass it as the 2nd argument to the request method function
// ie between the route string and the callback method
// router.get("/all", loggerMiddleware, (request, response) => {
//     response.json(jsonData)
// })
// to apply it to all routes, ie at the app level instead of the route level,
// then move the middleware into a seperate file which exports it and then we
// import it wherever the express app exists(index.js) and pass it to app.use()

import jsonDataController from "../controllers/jsonDataController.js"
// the idiomatic way to send json is to use .json() instead of .send():
router.get("/all", jsonDataController.getAll) // GET http://localhost:8000/api/json/all
// We can chain the status code of the response before its sent.
// to get a single post by its id, we use :id inside the route
// which is available as a string inside request.params object
router.get("/:id", jsonDataController.getByID) // GET http://localhost:8000/api/json/1
// limiting response size by specifying it as a query:
// http://localhost:8000/api/json/limit/all?limit=2
// should only send a response with 2 or less entires
// WARNING: COULD BE AN INJECTION ATTACK INSTEAD OF '2'
// such queries in the url are stored as a string in
// request.query object.
router.get("/limit/all", jsonDataController.limitedGetAll) // GET http://localhost:8000/api/json/limit/all?limit=2

router.post("/", jsonDataController.postEntry) // POST http://localhost:8000/api/json/

// Update using PUT Request: (id is not a part of the body, added as the URL parameter)
router.put("/:id", jsonDataController.putEntry) // PUT http://localhost:8000/api/json/:id

router.delete("/:id", jsonDataController.deleteEntry) // DELETE http://localhost:8000/api/json/:id

// finally export this router:
export default router