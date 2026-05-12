import express from 'express';
import invitationRoutes from './modules/invitations/invitation.routes.js'; 
import userRoutes from './modules/user/user.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import companyRoutes from './modules/company/company.routes.js';
import communityRoutes from './modules/community/community.routes.js';
import postRoutes from './modules/post/post.routes.js';
import pollRoutes from './modules/poll/poll.routes.js';

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/polls', pollRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;