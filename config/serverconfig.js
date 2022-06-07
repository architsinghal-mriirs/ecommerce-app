require('dotenv').config()

let port = process.env.PORT;

console.log(process.env)

module.exports = {
    PORT : port
}