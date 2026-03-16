const users = require('../Models/UserModel')
const jsonWebToken = require('jsonwebtoken')


exports.RegisterController = async (req, res) => {
    console.log("Inside RegisterController");

    const { name, phoneNo, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(403).json("User already exist , Please try with another email")
        }
        else {
            const result = new users({ name, phoneNo, email, password, userType: "user" })
            await result.save()
            res.status(200).json(result)




        }
    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.LoginController = async (req, res) => {
    console.log("Inside Login Controller");

    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jsonWebToken.sign({ userID: existingUser._id }, process.env.JWT_PASSWORD)
            console.log(token);
            res.status(200).json({ user: existingUser, token })

        }
        else {
            res.status(404).json("Invalid Credentials")
        }
    } catch (err) {
        res.status(401).json(err)
    }


}

exports.updateController = async (req, res) => {
    console.log("Inside updateController");
    const { name, password, phoneNo, userType } = req.body
    const { email } = req.params

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const result = await users.findOneAndUpdate({ email }, { email, name, password, phoneNo, userType },{new:true})
            if(result){
                res.status(200).json(result)
            }

        }
        else{
            res.status(404).json("Error Occurred")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }



}