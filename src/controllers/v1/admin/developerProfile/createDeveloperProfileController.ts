import createDeveloperProfileService from '../../../../services/v1/admin/developerProfile/createDeveloperProfileService';
import { Request, Response, NextFunction } from 'express';

import CreateDeveloperProfileInterface from '../../../../interfaces/developerProfile/createDeveloperProfileInterface';

export default async function createDeveloperProfileController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const developerDetails: CreateDeveloperProfileInterface = {
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
      email: req.body.email,
    };

    const developerProfile = await createDeveloperProfileService(
      developerDetails,
    );

    res.status(200).json({
      success: true,
      data: developerProfile,
      message: 'Developer profile created successfully',
    });
  } catch (err) {
    next(err);
  }
}
