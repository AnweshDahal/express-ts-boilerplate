import showDeveloperProfileService from '../../../../services/v1/admin/developerProfile/showDeveloperProfileService';
import { Request, Response, NextFunction } from 'express';

export default async function showDeveloperProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const developerProfile = await showDeveloperProfileService(
      parseInt(req.params.id),
    );

    res.status(200).json({
      success: true,
      data: developerProfile,
      message: 'Developer profile retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}
