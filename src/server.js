import dotenv from 'dotenv';
import app from './index.js';
import path from 'path'
import { fileURLToPath } from 'url';



dotenv.config({ path: "./../.env" });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running on Port: ${port}`)
});
