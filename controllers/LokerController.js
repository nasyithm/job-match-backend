import Loker from "../models/LokerModel.js";
import path from "path";
import fs from "fs";

export const getLokers = async (req, res) => {
  try {
    const response = await Loker.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLokerById = async (req, res) => {
  try {
    const response = await Loker.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveLoker = (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const contact = req.body.contact;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Loker.create({ name: name, image: fileName, url: url, description: description, location: location,contact: contact });
      res.status(201).json({ msg: "Loker Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateLoker = async (req, res) => {
  const loker = await Loker.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!loker) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = loker.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${loker.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500) .json({ msg: err.message });
    });
  }

  const name = req.body.title;
  const contact = req.body.contact;
  const description = req.body.description;
  const location = req.body.location;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Loker.update(
      { name: name, image: fileName, url: url,description: description,location: location,contact: contact },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Loker Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLoker = async (req, res) => {
  const loker = await Loker.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!loker) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${loker.image}`;
    fs.unlinkSync(filepath);
    await Loker.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Loker Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
