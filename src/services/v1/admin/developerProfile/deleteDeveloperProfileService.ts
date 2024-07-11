import { eq, and } from 'drizzle-orm';
import { developerProfiles, developerSkill } from '../../../../db/schema';
import db from '../../../../db/setup';

export default async function (developerProfileId: number) {
  // begin transaction
  const result = await db.transaction(async (tx) => {
    const deletedDeveloperSkills = await tx
      .update(developerSkill)
      .set({ isDeleted: true })
      .where(
        and(
          eq(developerSkill.developerId, developerProfileId),
          eq(developerSkill.isDeleted, false),
        ),
      )
      .returning();

    const deletedDeveloperProfile = await tx
      .update(developerProfiles)
      .set({ isDeleted: true })
      .where(
        and(
          eq(developerProfiles.id, developerProfileId),
          eq(developerProfiles.isDeleted, false),
        ),
      )
      .returning();

    return {
      deletedDeveloperProfile,
      deletedDeveloperSkills,
    };
  });

  return result;
}
