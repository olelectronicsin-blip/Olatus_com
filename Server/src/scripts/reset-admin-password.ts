import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../utils/database.js';
import { User } from '../models/User.js';

dotenv.config();

async function resetAdminPassword() {
  console.log('Resetting admin password...');

  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@olatus.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Olatus2024!';

  console.log('Looking for admin user:', adminEmail);
  const admin = await User.findOne({ email: adminEmail });

  if (!admin) {
    console.error('Admin user not found!');
    process.exit(1);
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  
  // Update the user
  admin.password = hashedPassword;
  await admin.save();

  console.log('✅ Admin password reset successfully!');
  console.log('Email:', adminEmail);
  console.log('Password:', adminPassword);

  // Verify it works
  const isValid = await bcrypt.compare(adminPassword, admin.password);
  console.log('Password verification:', isValid ? '✅ PASSED' : '❌ FAILED');

  process.exit(0);
}

resetAdminPassword().catch((error) => {
  console.error('Failed to reset password:', error);
  process.exit(1);
});
