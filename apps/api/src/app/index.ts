import * as cors from 'cors';
import * as express from 'express';
import { createReferral, deleteReferralById, getAllReferrals, getReferralById, updateReferral } from './referrals/api';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/referrals', getAllReferrals);
app.get('/referrals/:id', getReferralById);
app.post('/referrals/delete', deleteReferralById);
app.post('/referrals/update', updateReferral);
app.post('/referrals/create', createReferral);

export default app;
