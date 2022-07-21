const router = require("express").Router();
const multer = require("multer");
const newRegistration = require("../Models/newRegistration");
const CryptoJS = require("crypto-js");

const Schools = require("../Models/Schools");

const { verifyTokenAndAdmin } = require("./verifyToken");

// const Storage = multer.diskStorage({
//   destination: "Schools",
//   filename: (req, file, cb) => {
//     cb(null, Date.now + file.originalname);
//   },
// });
// const upload = multer({
//   storage: Storage,
// }).single("schoolImage");

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  console.log("....................................................");

  console.log(req.body.schoolImage);
  try {
    const newSchool = new Schools({
      title: req.body.title || "",
      desc: req.body.desc || "",
      img: { data: req.body.schoolImage || "", contentType: "image/png" },
      categories: req.body.categories || "",
      knownFor: req.body.knownFor || "",
      location: req.body.location || "",
      board: req.body.board || "",
      ownership: req.body.ownership || "",
      coEd: req.body.coEd || "",
      // campusSize: req.body.campusSize||"",
      courses: req.body.courses || "",
      academicStats: req.body.academicStats || "",
      admissionStatus: req.body.admissionStatus || "",
      startDate: req.body.startDate || "",
      endDate: req.body.endDate || "",
      annualFees: req.body.annualFees || "",
      schoolLink: req.body.schoolLink || "",
    });
    const savedSchool = await newSchool.save();
    res
      .status(201)
      .json({
        data: savedSchool,
        success: true,
        message: "Successfully registered",
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Registration unsuccessfull" });
  }
});
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Schools.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Schools.findByIdAndDelete(req.params.id);
    res.status(200).json("Product is deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategories = req.query.categories;
  let schools;
  try {
    if (qNew) {
      schools = await Schools.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategories) {
      schools = await Schools.find({
        categories: {
          $in: [qCategories],
        },
      });
    } else {
      schools = await Schools.find();
    }
    res
      .status(200)
      .json({ data: schools, success: true, message: "Successfulll" });
  } catch (err) {
    res.status(500).json({ data: err, success: false, message: "failed" });
  }
});

router.get("/:id", async (req, res) => {
  try {
   const school = await Schools.findById(req.params.id);

    res.status(200).json({ data: school, success: true, message: "Successfulll" });
  } catch (err) {
    res.status(500).json({ data: err, success: false, message: "failed" });
  }
});

router.post("/:id/register", async (req, res) => {
  const newRegister = new newRegistration({
    username: req.body.username,
    email: req.body.email,
    age:req.body.age,
    phno:req.body.phno,
    cource:req.body.cource,
    key: CryptoJS.AES.encrypt(
      req.body.toString(),
      process.env.NEW_REGISTER_KEY
    ).toString(),
  });
  try {
    const savedUser = await newRegister.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
