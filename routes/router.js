const express = require('express')
const { getstudent, getStudentById, addstudent, update, deletestudent } = require('../controllers/studentcontroll')

const router = express.Router()

//routes


router.get('/getalllist',getstudent)
router.get('/getstu/:id',getStudentById)
router.post('/poststu',addstudent)
router.put('/update/:id',update)
router.delete('/delete/:id',deletestudent)






module.exports = router