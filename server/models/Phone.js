import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    "@available": { type: String },
    "@group_id": { type: String },
    "@id": { type: String },
    barcode: { type: String },
    categoryId: { type: String },
    country_of_origin: { type: String },
    currencyId: { type: String },
    delivery: { type: String },
    description: { type: String },
    dimensions: { type: String },
    local_delivery_cost: { type: String },
    manufacturer_warranty: { type: String },
    name: { type: String },
    param: { type: [Schema.Types.Mixed] },
    pickup: { type: String },
    picture: { type: [String] },
    price: { type: Number },
    sales_notes: { type: String },
    store: { type: String },
    url: { type: String },
    vendor: { type: String },
    vendorCode: { type: String },
    weight: { type: String }
});

mongoose.model('Phone', PhoneSchema);