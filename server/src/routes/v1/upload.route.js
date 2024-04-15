import express from 'express';
import { uploadController } from '~/controllers/upload.controller';
import { verifyTokenMiddleware } from '~/middlewares/verifyToken.middleware';

const Router = express.Router();

// Verify all router with upload
//Router.use(verifyTokenMiddleware.verifyToken);


//Router.route('/revoke').post( uploadController.revokeToken);

Router.route('/token').get( uploadController.getToken);


export const uploadRoute = Router;