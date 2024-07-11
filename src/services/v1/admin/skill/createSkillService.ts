import CreateSkillInterface from '../../../../interfaces/skill/createSkillInterface';
import { eq, and } from 'drizzle-orm';
import { skills } from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function createSkillService(
  skillDetails: CreateSkillInterface,
) {
  // ? Check if the skill already exists
  const skillExists = await db
    .select({ id: skills.id, isDeleted: skills.isDeleted })
    .from(skills)
    .where(and(eq(skills.name, skillDetails.name)))
    .limit(1);

  let skill: Array<typeof skills.$inferInsert> = [];

  if (skillExists.length > 0 && skillExists[0].isDeleted === false) {
    const error: ErrorInterface = {
      status: 409,
      message: 'Skill already exists',
    };

    throw error;
  } else if (skillExists.length > 0 && skillExists[0].isDeleted === true) {
    skill = await db
      .update(skills)
      .set({ isDeleted: false })
      .where(
        and(eq(skills.name, skillDetails.name), eq(skills.isDeleted, true)),
      )
      .returning();
  } else {
    skill = await db
      .insert(skills)
      .values({ name: skillDetails.name })
      .returning()
      .onConflictDoNothing();
  }

  if (!skill) {
    const error: ErrorInterface = {
      status: 500,
      message: 'Skill not created',
    };

    throw error;
  }

  return {
    name: skill[0].name,
  };
}
