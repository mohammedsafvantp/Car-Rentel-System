const BookingDetails = require('../Models/BookingModel')
const CarDetails = require('../Models/CarModel')

exports.addBookingController = async (req, res) => {
    console.log("Inside AddBookingController");
    console.log(req.body);


    const { userId, RegNo, CarName, StartDate, EndDate, name, phoneNo, email, address } = req.body
    try {
        const carDetail = await CarDetails.findOne({ RegNo, Availability: 'Available' })
        if (carDetail) {
            const result = new BookingDetails({ userId, RegNo, CarName, StartDate, EndDate, name, phoneNo, email, address })
            result.save()

            res.status(200).json(result)

        }
        else {
            res.status(403).json("Car Not Available")
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

exports.viewBookingHistoryController = async (req, res) => {
    console.log("Inside viewBookingHistoryController");
    const { userId } = req.params
    console.log(userId);

    try {

        const result = await BookingDetails.find({ userId })
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(404).json("No Bookings Made Yet!")
        }



    } catch (err) {
        res.status(401).json(err)
    }

}

exports.deleteBookingHistoryController = async (req, res) => {
    console.log("Inside deleteBookingHistoryController ");
    console.log(req.params);

    const { RegNo } = req.params

    try {
        const result = await BookingDetails.findOneAndDelete({ RegNo })
        if (result) {
            const update = await CarDetails.findOneAndUpdate({ RegNo }, { Availability: 'Available' })
            if (result && update) {
                res.status(200).json(result, update)

            }
        }
        else {
            res.status(404).json("Not Found")
        }



    } catch (err) {
        res.status(401).json(err)
    }

}

exports.viewAllBookingHistoryController = async (req, res) => {
    console.log("Inside viewAllBookingHistoryController");
    try {
        const result = await BookingDetails.find()
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(403).json("Error Occured")
        }

    } catch (err) {
        res.status(401).json(err)
    }

}

exports.viewBookingDateController = async (req, res) => {
    console.log("Inside viewBookingDateController");
    const { RegNo } = req.params
    const decodedRegNo = decodeURIComponent(RegNo)
    console.log(decodedRegNo);



    try {
        const result = await BookingDetails.find({ RegNo: decodedRegNo })
        if (result.length > 0) {
            res.status(200).json(result)
        }


    } catch (err) {
        res.status(401).json(err)
    }



}