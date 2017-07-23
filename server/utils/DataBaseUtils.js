import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Phone';

const Phone = mongoose.model('Phone');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function countPhones() {
    return Phone.count();
}

export function listPhones(curPage, limit) {
    var start = curPage * limit - limit;

    return Phone.find({
        param: {
            $all: [
                { "$elemMatch": { "@name": "Операционная система", "#text": /Android/ } }
            ]
        }
    }).skip(start).limit(limit);
}

export function getPhone(id) {
    return Phone.findById(id);
}

export function createPhone(data) {
    const phone = new Phone({
        name: data.name,
        description: data.snippet,
        price: data.price,
        picture: data.picture
    });

    return phone.save();
}

export function deletePhone(id) {
    return Phone.findById(id).remove();
}