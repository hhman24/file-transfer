import { StatusCodes } from 'http-status-codes';
import { uploadService } from '~/services/upload.service';
import ApiError from '~/utils/ApiError';

const uploadFile = async (req, res, next) => {
  try {
    const {path} = req.body 
    const result = await uploadService.uploadFile(path);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};


export const uploadController = {
    uploadFile,
};
