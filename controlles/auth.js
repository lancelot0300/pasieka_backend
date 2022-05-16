import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            password: hash
        })
        await newUser.save()
        res.status(200).send("Stworzono użytkownika")
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).send("Nie ma takiego użytkownika")

        const isPassCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPassCorrect) return res.status(400).send("Hasło lub login nieprawidłowy")

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...others } = user._doc
        return res.cookie("access_token", token, {
            httpOnly: true
        })
            .status(200)
            .json({ ...others })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}