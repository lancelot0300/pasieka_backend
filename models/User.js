import mongoose from "mongoose";
const { Schema } = mongoose;

const UserScheama = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    token:{
        type: String,
        default: ""
    }

},
    { timestamps: true }
)

export default mongoose.model("User",UserScheama)