import {Sequelize} from "sequelize";

const db = new Sequelize('jobmatchdb','jobmatchuser','jobmatchpass123#',{
    host: 'db4free.net',
    dialect: "mysql"
});

export default db;