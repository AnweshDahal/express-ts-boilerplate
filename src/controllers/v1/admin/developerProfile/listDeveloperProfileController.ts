import listDeveloperProfileService from '../../../../services/v1/admin/developerProfile/listDeveloperProfileService';
import { Request, Response, NextFunction } from 'express';

export default async function listDeveloperProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const developerProfiles = await listDeveloperProfileService(req.query);

    res.status(200).json({
      success: true,
      data: developerProfiles,
      message: 'Developer profiles retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}
