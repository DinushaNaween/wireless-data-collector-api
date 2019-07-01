const mongoose = require('mongoose');

const dataStructure = mongoose.Schema({
    nodes: [{
        node_no: { type: String },
        node_data_01: { type: String },
        node_data_02: { type: String },
        retry: { type: String }
    }],
    centralName: { type: String },
    date: { type: Date },
    time: { type: String },
    packets: { type: Number }
})

module.exports = mongoose.model('Data', dataStructure);