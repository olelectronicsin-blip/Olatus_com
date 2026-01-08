import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../utils/database.js';
import { User } from '../models/User.js';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const resetPassword = async () => {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();

    const email = process.env.ADMIN_EMAIL || 'admin@olatus.com';
    // Use the password from env, but TRIM properly, or fallback to default
    const rawPassword = process.env.ADMIN_PASSWORD ? process.env.ADMIN_PASSWORD.trim() : 'Admin@Olatus2024!';

    console.log(`👤 Finding user: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
        console.error('❌ Admin user not found in DB!');
        process.exit(1);
    }

    console.log(`🔑 Resetting password to: '${rawPassword}'`);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    user.password = hashedPassword;
    await user.save();

    console.log('✅ Password updated successfully!');

    // Test comparison immediately
    const isMatch = await bcrypt.compare(rawPassword, user.password);
    console.log(`🧪 Immediate verification check: ${isMatch ? 'PASSED' : 'FAILED'}`);

    process.exit(0);
};

resetPassword().catch(err => {
    console.error(err);
    process.exit(1);
});
