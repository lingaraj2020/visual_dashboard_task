const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get("/filters",async(req,res)=>{
    const { endYear, topics, sector, region, pestle, source, swot, country, city } = req.query;
    let filter = {};
    if (endYear) filter.year = endYear;
    if (topics) filter.topics = topics;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;
    if (country) filter.country = country;
    if (city) filter.city = city;

  try {
    const data = await Data.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports=router;