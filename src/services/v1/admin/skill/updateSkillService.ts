import UpdateSkillInterface from '../../../../interfaces/skill/updateSkillInterface';
import { eq, and } from 'drizzle-orm';
import { skills } from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function updateSkillService(
  skillDetails: UpdateSkillInterface,
  skillId: number,
) {
  // Check if the skill exists
  const skillExists = await db
    .select({ id: skills.id })
    .from(skills)
    .where(and(eq(skills.id, skillId), eq(skills.isDeleted, false)))
    .limit(1);

  if (skillExists.length < 1) {
    const error: ErrorInterface = {
      status: 404,
      message: 'Skill not found',
    };
    throw error;
  }
  // Check if the skill name is taken
  const skillNameTaken = await db
    .select({ id: skills.id })
    .from(skills)
    .where(and(eq(skills.name, skillDetails.name), eq(skills.isDeleted, false)))
    .limit(1);

  if (skillNameTaken.length > 0) {
    const error: ErrorInterface = {
      status: 409,
      message: 'This name is already taken',
    };

    throw error;
  }

  const skill = await db
    .update(skills)
    .set({ name: skillDetails.name, updatedAt: new Date() })
    .where(and(eq(skills.id, skillId), eq(skills.isDeleted, false)))
    .returning();

  if (!skill) {
    const error: ErrorInterface = {
      status: 500,
      message: 'Skill not updated',
    };
    throw error;
  }

  return {
    name: skill[0].name,
  };
}
