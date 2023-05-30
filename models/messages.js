const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const messagesSchema = new Schema( {
    email: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true },
    message: { type: String, required: true },
});

const Message = model('Message', messagesSchema);

module.exports = {Message};