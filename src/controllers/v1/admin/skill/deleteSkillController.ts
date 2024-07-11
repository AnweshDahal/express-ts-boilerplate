import deleteSkillService from '../../../../services/v1/admin/skill/deleteSkillService';
import { Request, Response, NextFunction } from 'express';

export default async function deleteSkillController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const deletedSkill = await deleteSkillService(parseInt(req.params.id));

    res.status(200).json({
      success: true,
      data: deletedSkill,
      message: 'Skill deleted successfully',
    });
  } catch (err) {
    next(err);
  }
}
