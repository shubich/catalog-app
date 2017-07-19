import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Phone';

const Phone = mongoose.model('Phone');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listPhones(page) {
    var limit = 5;
    var start = page * limit - limit;
    return Phone.find().skip(start).limit(limit);
}

export function getPhone(id) {
    return Phone.findById(id);
}

export function createPhone(data) {
    const phone = new Phone({
        name: data.name,
        snippet: data.snippet,
        price: data.price,
        imageUrl: data.imageUrl
    });

    return phone.save();
}

export function deletePhone(id) {
    return Phone.findById(id).remove();
}