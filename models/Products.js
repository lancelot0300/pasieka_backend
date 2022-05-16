import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductScheama = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type:Number,
        required: true,
    },
    img: {
        type:String,
        required: true,
    },
    content: {
        type:String,
        required: true,
    }

},
    { timestamps: true }
)

export default mongoose.model("Product",ProductScheama)