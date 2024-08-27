const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "First Name Is Required"] },
    lastName: { type: String, required: [true, "Last Name Is Required"] },
    email: { 
        type: String, 
        required: [true, "Email Is Required"], 
        lowercase: true, 
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: { 
        type: String, 
        required: [true, "Password Is Required"], 
        minLength: [6, "Password must be at least 6 characters"]
    },
    role: { 
        type: String, 
        enum: ["user", "admin"], 
        default: "user"
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    
    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password using the generated salt
        user.password = await bcrypt.hash(user.password, salt);
        
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
