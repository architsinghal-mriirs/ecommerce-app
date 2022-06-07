const express = require('express');
const configs = require('./config/serverconfig');
const bodyParser = require('body-parser');
const categoriesRoute = require('../ecommerce/routes/categoryRoute');
const productRoutes = require('./routes/productRoute');
const userRoutes = require('./routes/user.route');
const cartRoutes = require('./routes/cart.routes');
const db = require('./models/index');
const user = require('./models/index').Users;
const Role = require('./models/index').roles;


const Products = require('./models/index').Products;
const Categories = require('./models/index').Categories;
const app = express();
//const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

categoriesRoute(app);
productRoutes(app);
userRoutes(app);
cartRoutes(app);

app.get('/home', async function (req, res) {
    const getCategory = await Categories.findAll({ include: Products });
    res.json(getCategory);
})


app.listen(configs.PORT, async()=>{
    console.log("Server start on port " + configs.PORT);
  
  // await db.sequelize.sync({ force: true });

})

