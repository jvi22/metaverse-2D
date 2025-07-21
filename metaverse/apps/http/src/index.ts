import express from 'express';
import { router } from './routes/v1';

const app = express();

//this contains all Routers 
//which will handle all my requests

app.use("/api/v1", router)

app.listen(process.env.PORT || 3000 )