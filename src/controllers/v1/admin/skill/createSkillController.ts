import createSkillService from '../../../../services/v1/admin/skill/createSkillService';
import { Request, Response, NextFunction } from 'express';

export default async function createSkillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const skill = await createSkillService({
      name: req.body.name,
    });

    res.status(200).json({
      success: true,
      data: skill,
      message: 'Skill created successfully',
    });
  } catch (err) {
    next(err);
  }
}
