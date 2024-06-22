const mongoose = require('mongoose');

const meetingRequestSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    
    meetingDate: {
        type: Date,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    requestedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MeetingRequest', meetingRequestSchema);
