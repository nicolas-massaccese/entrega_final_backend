const { Product } = require("../models/product");

const productRead = async () => {
    const sortedProducts = await Product.find({})
    return sortedProducts;
};


module.exports = { productRead }