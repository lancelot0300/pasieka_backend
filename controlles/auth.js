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
        let user = await User.findOne({ username: req.body.username })
        if (!user) return res.status(404).send("Nie ma takiego użytkownika")

        const isPassCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPassCorrect) return res.status(400).send("Hasło lub login nieprawidłowy")

        user = await putToken(user._id)


        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, token: user.token }, process.env.JWT)

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

const putToken = async (userId) => {
    try {
        const token = (Math.random() + 1).toString(36).substring(7);
        return await User.findByIdAndUpdate(userId, { token: token }, {
            new: true
        })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

export const logout = async (req, res) => {
    try {
        console.log(req.user)
        await User.findByIdAndUpdate(req.user.id, { token: "" })
        return res.cookie("access_token", "", {
            httpOnly: true,
            maxAge:1
        }).status(200).send("Wylogowano")
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
}