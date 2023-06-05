const express = require("express");
const authMiddleWare = require("../middleware/auth");
const router = express.Router();
const TTSController = require("../controllers/TTSController");

router.post("/", authMiddleWare, TTSController.tts);

module.exports = router;
