const express = require("express");
const router = express.Router();
const {
    getFood,
    getFoods,
    postFood,
    putFood,
    deleteFood
} = require("../controllers/foods.controller");

router.get("/:id", getFood);
router.get("/", getFoods);
router.post("/:id", postFood);
router.put("/", putFood);
router.delete("/:id", deleteFood);

module.exports = router;
