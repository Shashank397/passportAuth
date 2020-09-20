const mysql = require('mysql')
const dbConfig = require('../config/dbConfig')
const sequelize = require('sequelize')

var authenticate = dbConfig.define("authenticate", {
    username: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize.STRING,
        timestamps: false
    }
},
{
    tableName: "authenticate",

})
authenticate.removeAttribute('id')
authenticate.removeAttribute('createdAt')
authenticate.removeAttribute('updatedAt')
module.exports = authenticate