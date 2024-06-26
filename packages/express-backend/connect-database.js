import mongoose from 'mongoose';
import { config } from 'dotenv';

const ENV_PATH = '.env';

config({ path: ENV_PATH });

// connect to the mongo cloud database

mongoose.set('debug', true);

mongoose
	.connect(process.env.MONGODB_URI, {})
	.catch((error) => console.log(error));
