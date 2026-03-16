const CarDetails = require('../Models/CarModel');
const { options } = require('../Router/router');


exports.addCarController = async (req, res) => {
    console.log("Inside addCarController ");



    const { CarName, Year, RegNo, BodyType, Fuel, Transmission, Seat, Price } = req.body
    const CarImg = req.file.filename
    console.log(CarImg);

    try {
        const existingCar = await CarDetails.findOne({ RegNo })
        if (existingCar) {
            res.status(403).json("Car already registered!")
        }
        else {
            const result = new CarDetails({ CarName, Year, RegNo, BodyType, Fuel, Transmission, Seat, Price, CarImg, Availability: "Available", })
            await result.save()
            res.status(200).json(result)
        }

    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.viewAllCarController = async (req, res) => {
    console.log("Inside viewAllCarController");
    const searchKey = req.query.search
    console.log(searchKey);
    


    try {
        const result = await CarDetails.find({CarName:{$regex:searchKey}})
        console.log(result);

        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(404).json("No Cars Found")
        }


    } catch (err) {
        res.status(401).json(err)
    }



}

exports.deleteCarController = async (req, res) => {
    const { RegNo } = req.params
    console.log(RegNo);


    try {
        const existingCar = await CarDetails.findOne({ RegNo })
        if (existingCar) {
            const result = await CarDetails.findOneAndDelete({ RegNo }, { new: true })
            console.log(result);
            if (result) {
                res.status(200).json(result)
            }


        } else {
            res.status(404).json("Car Details not Found")
        }

    } catch (err) {
        res.status(401).json(err)
    }



}

exports.updateCarController = async (req, res) => {
    const { Regno } = req.params
    console.log(Regno);
    // console.log(req.body);

    const { CarName, Year, BodyType, RegNo, Fuel, Transmission, Seat, Price, Availability, CarImg } = req.body
    const uploadedImg = req.file ? req.file.filename : CarImg
    try {
        const existingCar = await CarDetails.find({ Regno })
        // console.log(existingCar);

        if (existingCar) {
            const result = await CarDetails.findOneAndUpdate({ RegNo: Regno }, { CarName, Year, BodyType, RegNo, Fuel, Transmission, Seat, Price, RegNo, CarImg: uploadedImg, Availability }, { new: true })
            console.log(result);

            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(403).json("error")
            }
        }
        else {
            res.status(404).json("Car not found")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

exports.viewTypeCarController = async (req, res) => {
    console.log("Inside viewTypeCarController");

    const { BodyType } = req.params
    console.log(BodyType);

    const token = req.headers['authorization']
    console.log(token);

    if (token) {
        try {
            const result = await CarDetails.find({ BodyType })
            console.log(result);
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(405).json("No cars available at the moment")
            }



        } catch (err) {
            res.status(401).json(err)
        }

    }
    else {
        res.status(403).json("Token Missing , Please Login ")
    }




}


exports.viewHomeCarController = async (req, res) => {
    console.log("inside viewHomeCarController");
    try{
        const result=(await CarDetails.find()).slice(0,3)
        if(result){
            res.status(200).json(result)
        }
        else{
            res.status(404).json("No Cars Found")
        }
        
        
    }catch(err){
        res.status(499).json(err)
    }
    
}