import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    name: { type: String, required: true },
    snippet: { type: String },
    price: { type: String },
    imageUrl: { type: String }
});

mongoose.model('Phone', PhoneSchema);