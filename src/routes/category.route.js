const express = require('express')
const router = express.Router()
const categoryController= require('../controller/category.controller')

router.post('/categories',categoryController.createCategory)
router.get('/categories',categoryController.getAllCategories)
router.post('/categories/:id',categoryController.updateCategoryById)
router.delete('/categories/:id',categoryController.deleteCategoryId)




module.exports = router