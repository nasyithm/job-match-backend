import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Pekerja = db.define(
  'pekerja',
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tempatTanggalLahir: DataTypes.STRING,
    agama: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    keahlian: DataTypes.STRING,
    ijazah: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    noTelp: DataTypes.STRING
  },
  {
    freezeTableName: true
  }
);

export default Pekerja;

(async () => {
  await db.sync();
})();
