import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
        product: {
            type : String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }

})

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    cart: [cartSchema]
},
    { timestamps: true }
)

export default mongoose.model("Order",OrderSchema)