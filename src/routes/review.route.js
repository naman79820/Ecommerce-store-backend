const express =require('express');
const router = express.Router()

const reviewController = require("../controller/reviews.controller")

router.post("/reviews",reviewController.createReview)
router.get("/reviews",reviewController.getReview)
router.put("/reviews/:id",reviewController.updateReviews)
router.delete("/reviews/:id",reviewController.deleteReview)

module.exports = router
