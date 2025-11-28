import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(_filename)


dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

