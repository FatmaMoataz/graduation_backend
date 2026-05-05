import express from 'express';
import invitationRoutes from './modules/invitations/invitation.routes.js'; 
import userRoutes from './modules/user/user.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import companyRoutes from './modules/company/company.routes.js';
import communityRoutes from './modules/community/community.routes.js';

const app = express();

// middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/communities', communityRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;