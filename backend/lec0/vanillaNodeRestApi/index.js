import http from "http"
import productController from "./controllers/productsController.js"

const server = http.createServer((request, response) => {
    if (request.url === "/api/products" && request.method === "GET") {
        productController.getAllProducts(request, response)
    } else if (request.url.match(/\/api\/product\/[0-9]+/)) {
        const id = request.url.split("/")[3]
        if (request.method === "GET") {
            productController.getProductByID(request, response, id)
        } else if (request.method === "PUT") {
            productController.updateProductByID(request, response, id)
        } else if (request.method === "DELETE") {
            productController.deleteProductByID(request, response, id)
        }
    } else if (request.url === "/api/product/new" && request.method === "POST") {
        productController.createProduct(request, response)
    } else {
        response.writeHead(404, { "Content-Type": "text/html" })
        response.write("<h1>404 - Route Not Found</h1>")
        response.end()
    }
})

const PORT = 5000
server.listen(PORT, () => { console.log("Server running on port:", PORT) })