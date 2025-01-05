import http from "http";
import productController from "./controllers/productsController.js";

const server = http.createServer((request, response) => {
    if (request.url === "/api/products" && request.method === "GET") {
        productController.getAllProducts(request, response);
    } else if (request.url.match(/\/api\/product\/[0-9]+/) && request.method === "GET") {
        const id = request.url.split("/")[3];
        productController.getProductByID(request, response, id);
    } else {
        response.writeHead(404, { "Content-Type": "text/html" });
        response.write("<h1>404 - Route Not Found</h1>");
        response.end();
    }
})

const PORT = 5000;
server.listen(PORT, () => { console.log("Server running on port:", PORT); });