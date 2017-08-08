import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Phone';

const Phone = mongoose.model('Phone');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, { useMongoClient: true });
}

function reParam(params) {
    var reParams = [];
    for (var key in params) {
        var values = [];
        for (var i = 0; i < params[key].length; i++) {
            values.push({ "@name": key, "#text": new RegExp(params[key][i]) });
        }
        reParams.push({ "$elemMatch": { $or: values } });
    }
    return { $all: reParams };
}

function prepare(search) {
    if (search.param) search.param = reParam(search.param);
    if (search.name) search.name = new RegExp(search.name, 'i');
    if (search.price) search.price = { $gte: search.price.min, $lte: search.price.max };
}

export function countPhones(search) {
    prepare(search);
    return Phone.count(search);
}

export function listPhones(search, curPage, limit) {
    var start = curPage * limit - limit;
    prepare(search);
    return Phone.find(search).skip(start).limit(limit);
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

export function getFieldValues(field) {
    return Phone.distinct(field);
}