import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    transactionId:{
        type: String,
    }
});

export default mongoose.model("Payment",paymentSchema);