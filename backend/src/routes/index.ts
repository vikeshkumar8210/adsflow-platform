import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/rbac.middleware';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);

router.get('/admin/dashboard', authenticateJWT, authorizeRoles('ADMIN'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to AdsFlow Enterprise Admin Panel',
    user: req.user,
  });
});

export default router;