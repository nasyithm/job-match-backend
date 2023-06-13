import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Loker = db.define('loker', {
name: DataTypes.STRING,
image: DataTypes.STRING,
url: DataTypes.STRING,
description: DataTypes.TEXT,
location: DataTypes.STRING,
contact: DataTypes.STRING
}, {
freezeTableName: true
});

export default Loker;

(async () => {
await db.sync();
})();