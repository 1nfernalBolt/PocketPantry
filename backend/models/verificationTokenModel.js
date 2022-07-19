const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema of what a verification token is
const verifyTokenSchema = mongoose.Schema(
    {
        UserId: {
            type: String,
            required: true,
        },
        Token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 3600, // 1 Hour
        },
    },
    {
        timestamps: true,
    }
);

// Encrypts token using bcrypt
verifyTokenSchema.pre('save', async function(next) {
    if (!this.isModified('Token')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.Token = await bcrypt.hash(this.Token, salt);
});

// Compares tokens
verifyTokenSchema.methods.matchToken = async function (enteredToken) {
    return await bcrypt.compare(enteredToken, this.Token);
};

// Link "VerifyToken" to the schema and export
const VerifyToken = mongoose.model('VerifyToken', verifyTokenSchema);

module.exports = VerifyToken;
