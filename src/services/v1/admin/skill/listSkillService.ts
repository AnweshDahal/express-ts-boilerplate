import { eq } from 'drizzle-orm';
import { skills } from '../../../../db/schema';
import db from '../../../../db/setup';

export default async function listSkillService() {
  const skillList = await db
    .select({ id: skills.id, name: skills.name })
    .from(skills)
    .where(eq(skills.isDeleted, false));

  return skillList;
}
