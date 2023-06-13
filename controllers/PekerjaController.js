import Pekerja from "../models/PekerjaModel.js";
import path from "path";
import fs from "fs";

export const getPekerja = async (req, res) => {
  try {
    const response = await Pekerja.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPekerjaById = async (req, res) => {
  try {
    const response = await Pekerja.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const savePekerja = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.name;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const tempatTanggalLahir = req.body.tempatTanggalLahir;
  const agama = req.body.agama;
  const jenisKelamin = req.body.jenisKelamin;
  const keahlian = req.body.keahlian;
  const ijazah = req.body.ijazah;
  const deskripsi = req.body.deskripsi;
  const noTelp = req.body.noTelp;

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Pekerja.create({
        name: name,
        email: email,
        alamat: alamat,
        tempatTanggalLahir: tempatTanggalLahir,
        agama: agama,
        jenisKelamin: jenisKelamin,
        keahlian: keahlian,
        ijazah: ijazah,
        deskripsi: deskripsi,
        noTelp: noTelp,
        image: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Pekerja Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updatePekerja = async (req, res) => {
  const pekerja = await Pekerja.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!pekerja) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = pekerja.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
      if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${pekerja.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const name = req.body.name;
  const email = req.body.email;
  const alamat = req.body.alamat;
  const tempatTanggalLahir = req.body.tempatTanggalLahir;
  const agama = req.body.agama;
  const jenisKelamin = req.body.jenisKelamin;
  const keahlian = req.body.keahlian;
  const ijazah = req.body.ijazah;
  const noTelp = req.body.noTelp;
  const deskripsi = req.body.deskripsi;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Pekerja.update(
      {
        name: name,
        email: email,
        alamat: alamat,
        tempatTanggalLahir: tempatTanggalLahir,
        agama: agama,
        jenisKelamin: jenisKelamin,
        keahlian: keahlian,
        ijazah: ijazah,
        deskripsi: deskripsi,
        noTelp: noTelp,
        image: fileName,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Pekerja Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePekerja = async (req, res) => {
  const pekerja = await Pekerja.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!pekerja) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${pekerja.image}`;
    fs.unlinkSync(filepath);
    await Pekerja.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pekerja Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

