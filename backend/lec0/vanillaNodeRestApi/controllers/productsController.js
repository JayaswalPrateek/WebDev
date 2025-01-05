import Product from "../models/productsModel.js";

async function getAllProducts(request, response) {
    try {
        const products = await Product.getAll();
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(products));
    } catch (error) {
        console.error(error);
    } finally {
        response.end();
    }
}

async function getProductByID(request, response, id) {
    try {
        const product = await Product.getByID(id);
        if (product) {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(product));
        } else {
            response.writeHead(404, { "Content-Type": "text-html" });
            response.write(`<h1>404 - Product with id=${id} not found</h1>`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        response.end();
    }
}

export default { getAllProducts, getProductByID };