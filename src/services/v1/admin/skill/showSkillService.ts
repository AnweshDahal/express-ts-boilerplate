import { eq, and } from 'drizzle-orm';
import { skills } from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function showSkillService(skillId: number) {
  const skill = await db
    .select({ id: skills.id, name: skills.name })
    .from(skills)
    .where(and(eq(skills.id, skillId), eq(skills.isDeleted, false)));

  if (skill.length < 1) {
    const error: ErrorInterface = {
      status: 404,
      message: 'Skill not found',
    };

    throw error;
  }

  return skill;
}
