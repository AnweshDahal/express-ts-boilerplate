import listSkillService from '../../../../services/v1/admin/skill/listSkillService';
import { Request, Response, NextFunction } from 'express';

export default async function listSkillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const skills = await listSkillService();
    res.status(200).json({
      success: true,
      data: skills,
      message: 'Skills retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
}
