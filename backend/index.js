import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Use import instead of require for ES modules
import cors from 'cors';
import bodyParser from 'body-parser';



const User = mongoose.model('User', UserSchema);

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace the connection string with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/JobVoyage', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Reset Password
app.post('/reset-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password reset successful!" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again." });
    }
});

// Start the server
const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
