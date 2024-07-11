import showSkillService from '../../../../services/v1/admin/skill/showSkillService';
import { Request, Response, NextFunction } from 'express';

export default async function showSkillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const skill = await showSkillService(parseInt(req.params.id));

    res.status(200).json({
      success: true,
      data: skill,
      message: 'Skill retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}
