import { Router } from 'express';
import { upload } from '../middlewares/muttler.middleware.js';
import { generateController } from '../controllers/generate.controller.js';

const aiApiRouter = Router();

aiApiRouter.route('/aiApi').post(
    upload.single('image'),
    generateController
)

export default aiApiRouter;