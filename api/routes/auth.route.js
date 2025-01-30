import express from 'express';
import { googleOAuth, signup, signin } from '../controllers/auth.controller.js'
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', googleOAuth);
export default router;