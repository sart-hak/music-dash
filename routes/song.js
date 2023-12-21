const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");

router.post(
  "/create",
  async (req, res) => {
    const { name, thumbnail, genre } = req.body;
    if (!name || !thumbnail || !track) {
      return res.status(301).json({ err: "insufficient details" });
    }
    
    const username = req.user
    const songDetails = { username,name, thumbnail, genre};
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);


module.exports = router;
