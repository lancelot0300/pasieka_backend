import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
        required: true
    }
},
    { timestamps: true }
)

export default mongoose.model("Order",OrderSchema)