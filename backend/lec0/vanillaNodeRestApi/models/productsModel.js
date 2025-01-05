import products from "../data/products.js";

function getAll() {
    return new Promise.resolve(products);
}

function getByID(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id == id);
        resolve(product);
    })
}

export default { getAll, getByID };