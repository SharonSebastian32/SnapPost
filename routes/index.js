const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const postModel = require("../models/post");
const passport = require("passport");
const localStrategy = require("passport-local");
const { uploadToFirebase } = require("./multer"); // Import the Firebase upload function
const { upload } = require("./multer"); // Import the multer config
passport.use(new localStrategy(userModel.authenticate()));

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/feed", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const posts = await postModel.find().populate("user");
  res.render("feed", { user, posts });
});

router.get("/add", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("add", { user });
});
router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("image"),
  async (req, res, next) => {
    if (!req.file) {
      return res.status(404).send("No file uploaded");
    }

    try {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      const firebaseResult = await uploadToFirebase(req.file); // Upload to Firebase

      user.profileImage = firebaseResult.downloadURL; // Store Firebase download URL in user model
      await user.save();

      res.redirect("/profile");
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).send("Error uploading profile image");
    }
  }
);

// Handle post image upload on /createPost
router.post(
  "/createPost",
  isLoggedIn,
  upload.single("postImage"),
  async function (req, res) {
    if (!req.file) {
      return res.status(404).send("No files were uploaded");
    }

    try {
      const user = await userModel.findOne({
        username: req.session.passport.user,
      });
      const firebaseResult = await uploadToFirebase(req.file); // Upload to Firebase

      const post = await postModel.create({
        image: firebaseResult.downloadURL, // Store the Firebase download URL
        title: req.body.title,
        description: req.body.description,
        user: user._id,
      });

      user.posts.push(post._id);
      await user.save();
      res.redirect("/profile");
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).send("Error creating post");
    }
  }
);

router.get("/login", function (req, res, next) {
  res.render("profile", { user });
});

router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  res.render("profile", { user });
});

router.get("/show/posts", isLoggedIn, async function (req, res, next) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts");
  res.render("show", { user });
});

router.get("/register", async function (req, res) {
  res.render("register");
});

router.post("/register", function (req, res) {
  const { username, email, contact, password } = req.body;

  const userData = new userModel({ username, email, contact });
  userModel
    .register(userData, password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch(function (err) {
      console.error("Registration Error:", err);
      res.redirect("/register");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",

    failureFlash: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
