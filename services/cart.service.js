const { sequelize } = require('../models/index');
const { QueryTypes } = require('sequelize');
const Cart = require('../models/index').Cart;
const Product = require('../models/index').Products;
const CartProduct = require('../models/index').Cart_Products;

const createCart = async(uid) => {
    const cart = await Cart.create({
        userId : uid
    })

    return cart;
}

const addProductToCart = async(data) => {
    //console.log("data", data);
    const cart = await Cart.findOne({
        where:{
            id : data.cartId
        }
    });

    if(!cart.status == 'creation'){
        return false;
    }
    const product = await Product.findOne({
        where:{
            id : data.productId
        }
    });
   // cart.addProducts(product, {through : {quantity : 1}});

    const entry = await CartProduct.findOne({
        where: {
            cartId: cart.id,
            productId: product.id
        }
    });
   // console.log("Entry is ", entry);
   // console.log("Quantity is ", entry.quantity );
    if(!entry) {
        cart.addProduct(product, {through: {quantity: 1}});
    } else {
        let previousQuantity = entry.quantity;
        entry.quantity = previousQuantity + 1;
        await entry.save();
    }

    return cart;
}


const removeProductFromCart = async(data) => {
    //console.log("data", data);
    const cart = await Cart.findOne({
        where:{
            id : data.cartId
        }
    });

    if(!cart.status == 'creation'){
        return false;
    }
    const product = await Product.findOne({
        where:{
            id : data.productId
        }
    });
    const entry = await CartProduct.findOne({
        where: {
            cartId: cart.id,
            productId: product.id
        }
    });
    if(!entry) {
        //drop the cart because the quantity would be less than 1 in remove function
        return false;
    } else {
        let previousQuantity = entry.quantity;
        if(entry.quantity == 1){
            cart.removeProducts(product);
        }else{
            entry.quantity = previousQuantity - 1;
            await entry.save();
        }
    }

    return cart;
}

const getCartByUser = async (uid, cartStatus) => {
    let cart_data = {};
    const cart = await Cart.findOne({
        where: {
            userId: uid,
            status: cartStatus
        }
    });
    const cartProducts = await CartProduct.findAll({
        where :{
            cartId : cart.id
        }
    });
    cart_data.cart = cart;
    cart_data.products = cartProducts;
    const userCart = await cart.getProducts({
        where:{
            cartId : cart.id
        }
    });
    console.log("UserCart is", userCart);
    return cart_data;
}

const updateCartStatus = async(cartId, cartStatus) => {
    const cart = await Cart.findOne({
        where:{
            id : cartId
        }
    });

    cart.status = cartStatus;
    await cart.save();
    return cart;
}

const getTotalCost = async(uid, cartStatus) => {
    // getting the cart from user id
    const cart = await Cart.findOne({
        where: {
            userId: uid,
            status: cartStatus
        }
    });
    // getting the cart products from cart id;
    const cartProducts = await CartProduct.findAll({
        where :{
            cartId : cart.id
        }
    });
    // getting the product cost 
    const userCart = await cart.getProducts();
    let total_cost = 0;
    console.log();
}

const getCart = async(uid, cartStatus) => {
    let bill = {};
    const userCart = await Cart.findOne({
        where: {
            userId: uid,
            status: cartStatus
        }
    });
    const cartProdnQuant = await sequelize.query(
        "select Products.name as ProductName, Products.cost as Cost,Cart_Products.quantity as Quantity, Cart_Products.quantity * Products.cost as Total from Cart_Products,Products where Cart_Products.productId = Products.id and Cart_Products.cartId = ?",
     { 
        replacements:[userCart.id], 
        type: QueryTypes.SELECT 
    });
    bill.Products = cartProdnQuant;
    const cartCost = await sequelize.query(
        "select sum(Cart_Products.quantity * Products.cost) as cost from Cart_Products,Products where Cart_Products.productId = Products.id and Cart_Products.cartId = ?",
     { 
        replacements:[userCart.id], 
        type: QueryTypes.SELECT 
    });
    bill.Payable = cartCost;
    return bill;
}



module.exports = {
    createCart,
    addProductToCart,
    getCartByUser,
    removeProductFromCart,
    updateCartStatus,
    getCart
} 