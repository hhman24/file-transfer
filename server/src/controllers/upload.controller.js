import { StatusCodes } from 'http-status-codes';
import { uploadService } from '~/services/upload.service';

const revokeToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await uploadService.revokedToken(token);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getToken = async (req, res, next) => {
  try {
    const result = await uploadService.getToken();
    console.log(result);
    res.status(StatusCodes.OK).json({ access_token: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const uploadController = {
  getToken,
  revokeToken,
};
