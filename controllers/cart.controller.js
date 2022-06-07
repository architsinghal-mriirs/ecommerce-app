const CartService = require('../services/cart.service');

const addProductToCart = async(req,res) => {
    let cart = await CartService.getCartByUser(req.body.userId, 'creation');
    if(!cart){
        cart = await CartService.createCart(req.body.userId);
    }

    const response = await CartService.addProductToCart({
        productId : req.body.productId,
        cartId : cart.id
    });

    if(!response) {
        return res.json({
            code: 500,
            success: false,
            message: 'Cannot add product to cart'
        });
    }
    return res.json({
        code: 200,
        success: true,
        message: 'Added product to cart'
    });
}

const removeProductFromCart = async(req,res) => {
    let cart = await CartService.getCartByUser(req.body.userId, 'creation');
    if(!cart){
       return res.json({
           code : 500,
           success : false,
           message : 'No Product in the Cart'
       });
    }

    const response = await CartService.removeProductFromCart({
        productId : req.body.productId,
        cartId : cart.id
    });

    if(!response) {
        return res.json({
            code: 500,
            success: false,
            message: 'Cannot remove product to cart'
        });
    }
    return res.json({
        code: 200,
        success: true,
        message: 'Removed Product to cart'
    });
}

const updateCartStatus = async (req,res) => {
    const response = await CartService.updateCartStatus(req.body.cartId, req.body.status);
    return res.json({
        code : 201,
        success : true,
        message : 'Successfully updated the cart status',
        data : response
    })
}

const getUserCart = async(req,res) => {
    const response = await CartService.getCartByUser(req.body.userId, req.body.status);
    if(!response){
        return res.json({
            message : 'Cart not found',
            code : 404,
            success : false
        })
    }
    return res.json({
        code : 200,
        success : true,
        message : 'User cart fetched',
        data : response
    })
}

const getCartCost = async(req,res) => {
    const response = await CartService.getCart(req.body.userId, req.body.status);
    return res.json({
        code : 200,
        success : true,
        message : 'All carts fetched',
        data : response
    })
}
module.exports = {
    addProductToCart,
    updateCartStatus,
    removeProductFromCart,
    getUserCart,
    getCartCost
} 