import updateSkillService from '../../../../services/v1/admin/skill/updateSkillService';
import { Request, Response, NextFunction } from 'express';

export default async function updateSkillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updatedSkill = await updateSkillService(
      req.body,
      parseInt(req.params.id),
    );

    res.status(200).json({
      success: true,
      data: updatedSkill,
      message: 'Skill updated successfully',
    });
  } catch (err) {
    next(err);
  }
}
