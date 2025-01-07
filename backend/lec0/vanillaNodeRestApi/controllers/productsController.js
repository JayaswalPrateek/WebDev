import Product from "../models/productsModel.js"

async function getAllProducts(request, response) {
    try {
        const products = await Product.getAll()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(products))
    } catch (error) {
        response.writeHead(404, { "Content-Type": "text/html" })
        response.write("<h1>404 - Not Found</h1>")
    } finally {
        response.end()
    }
}

async function getProductByID(request, response, id) {
    try {
        const product = await Product.getByID(id)
        // if (product) {
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(product))
        // }
        // No need to handle the else case because
        // getByID() resolves only if there is no error
        // it rejects in case of an error, trigerring the catch block
        // hence the if block isnt needed either
    } catch (error) {
        response.writeHead(404, { "Content-Type": "text-html" })
        response.write(`<h1>404 - Product with id=${id} not found</h1>`)
    } finally {
        response.end()
    }
}

async function createProduct(request, response) {
    try {
        const dummy = {
            // add id dynamically using uuid npm package
            title: "foo",
            description: "bar baz",
            price: 1234
        }
        const newProduct = await Product.create(dummy)
        // if (newProduct) {
        response.writeHead(201, { "Content-Type": "application/json" })
        response.write(JSON.stringify(newProduct))
        // }
        // No need to handle the else case because
        // create() resolves only if there is no error
        // it rejects in case of an error, trigerring the catch block
        // hence the if block isnt needed either
    } catch (error) {
        response.writeHead(422, { "Content-Type": "text-html" })
        response.write(`<h1>422 - Couldn't add ${dummy}</h1>`)
    } finally {
        response.end()
    }
}

export default { getAllProducts, getProductByID, createProduct }