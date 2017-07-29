import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Phone';

const Phone = mongoose.model('Phone');

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function countPhones(search) {
    return Phone.count(search);
}

export function listPhones(search, curPage, limit) {
    var start = curPage * limit - limit;

    if (search.param) {
        var tmp = [];
        for (var key in search.param) {
            var values = [];
            for (var i = 0; i < search.param[key].length; i++) {
                values.push({ "@name": key, "#text": new RegExp(search.param[key][i]) });
            }
            tmp.push({ "$elemMatch": { $or: values } });
        }
        search.param = { $all: tmp };
        //console.log(tmp);
    }

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