import { logIn, signUp } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const user = await signUp(req.body);
  res.status(201).json(user);
}

export async function logInHandler(req, res) {
  const accessToken = await logIn(req.body);
  res.status(200).json({ accessToken });
}
