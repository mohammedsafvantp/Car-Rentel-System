const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const CarController = require('../Controller/CarController')
const jwtMiddleWare = require('../middlewares/jwtMiddleWare')
const multerMiddleWare = require('../middlewares/multerMiddleWare')
const BookingController = require('../Controller/BookingController')



router.post('/register', userController.RegisterController)

router.post('/login', userController.LoginController)

router.post('/add-car', jwtMiddleWare, multerMiddleWare.single("CarImg"), CarController.addCarController)

router.get('/view-car', CarController.viewAllCarController)

router.delete('/delete-car/:RegNo', CarController.deleteCarController)

router.put('/update-car/:Regno', jwtMiddleWare, multerMiddleWare.single("CarImg"), CarController.updateCarController)

router.get('/get-car/:BodyType', jwtMiddleWare, CarController.viewTypeCarController)

router.post('/add-booking', BookingController.addBookingController)

router.get('/view-booking/:userId', BookingController.viewBookingHistoryController)

router.delete('/delete-history/:RegNo',BookingController.deleteBookingHistoryController)

router.get('/get-all-booking',BookingController.viewAllBookingHistoryController)

router.put('/update-profile/:email',userController.updateController)

router.get('/view-all-booking/:RegNo',BookingController.viewBookingDateController)

router.get('/get-car',CarController.viewHomeCarController)






module.exports = router