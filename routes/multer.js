require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { v4: uuidv4 } = require("uuid");

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Configure Multer
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Function to handle file upload to Firebase
const uploadToFirebase = async (file) => {
  const uniqueFilename = uuidv4() + "." + file.originalname.split(".").pop();
  const storageRef = ref(storage, "uploads/" + uniqueFilename);

  // Upload the file to Firebase Storage
  await uploadBytes(storageRef, file.buffer);

  // Get the download URL
  const downloadURL = await getDownloadURL(storageRef);

  return { filename: uniqueFilename, downloadURL };
};

module.exports = { upload, uploadToFirebase };
