import updateDeveloperProfileService from '../../../../services/v1/admin/developerProfile/updateDeveloperProfileService';
import { Request, Response, NextFunction } from 'express';

import UpdateDeveloperProfileInterface from '../../../../interfaces/developerProfile/updateDeveloperProfileInterface';

export default async function updateDeveloperProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const developerProfileDetails: UpdateDeveloperProfileInterface = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      website: req.body.website,
      linkedinProfile: req.body.linkedinProfile,
      githubProfile: req.body.githubProfile,
      summary: req.body.summary,
      country: req.body.country,
      region: req.body.region,
      city: req.body.city,
    };

    const updatedDeveloperProfile = await updateDeveloperProfileService(
      developerProfileDetails,
      parseInt(req.params.id),
    );

    res.status(200).json({
      success: true,
      data: updatedDeveloperProfile,
      message: 'Developer profile updated successfully',
    });
  } catch (err) {
    next(err);
  }
}
