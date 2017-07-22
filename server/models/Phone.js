import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String },
    picture: { type: [String] },
    url: { type: String },
    price: { type: String },
    currencyId: { type: String },
    categoryId: { type: String }
});

mongoose.model('Phone', PhoneSchema);