import deleteDeveloperProfileService from '../../../../services/v1/admin/developerProfile/deleteDeveloperProfileService';
import { Request, Response, NextFunction } from 'express';

export default async function deleteDeveloperProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deletedDeveloperProfile = await deleteDeveloperProfileService(
      parseInt(req.params.id),
    );

    res.status(200).json({
      success: true,
      data: deletedDeveloperProfile,
      message: 'Developer profile deleted successfully',
    });
  } catch (err) {
    next(err);
  }
}
