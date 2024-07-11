import { eq, and } from 'drizzle-orm';
import {
  skills,
  developerExperienceEducationTrainingSkill,
} from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function deleteSkillService(skillId: number) {
  // ? Check if the skill exists
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

  //? check if the skill has any experiences
  const skillUsed = await db
    .select({ id: developerExperienceEducationTrainingSkill.id })
    .from(developerExperienceEducationTrainingSkill)
    .where(
      and(
        eq(developerExperienceEducationTrainingSkill.skillId, skillId),
        eq(developerExperienceEducationTrainingSkill.isDeleted, false),
      ),
    );

  if (skillUsed.length > 0) {
    const error: ErrorInterface = {
      status: 409,
      message:
        'There are experiences, trainings, or educations with this skill, Please update them first',
    };

    throw error;
  }

  const skill = await db
    .update(skills)
    .set({ isDeleted: true })
    .where(and(eq(skills.id, skillId), eq(skills.isDeleted, false)))
    .returning();

  return {
    name: skill[0].name,
  };
}
