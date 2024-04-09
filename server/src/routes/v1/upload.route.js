import express from 'express';
import { uploadController } from '~/controllers/upload.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';

const Router = express.Router();

// Verify all router with upload
//Router.use(verifyTokenMiddleware.verifyToken);


Router.route('/upfile').post( uploadController.uploadFile);

export const uploadRoute = Router;