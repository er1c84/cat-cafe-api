import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repositories/userRepo.js';

export async function signUp({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return createUser({ email, password: hashedPassword, role: 'USER' });
}

export async function logIn({ email, password }) {
  const error = new Error('Invalid email or password');
  error.status = 401;

  const user = await findUserByEmail(email);
  if (!user) throw error;

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw error;

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  );
}
