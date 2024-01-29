const { Sequelize } = require("sequelize");
require("dotenv").config({ path: ".env" });
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: true,
  }
);

try {
  sequelize.authenticate();
  // console.log("Hii Praan!! Connect....");
} catch (error) {
  console.log(
    "Unable to connect to Database.Please Check Your Configration",
    error
  );
  return false;
}
// sequelize.sync({ force: true });
module.exports = sequelize;
