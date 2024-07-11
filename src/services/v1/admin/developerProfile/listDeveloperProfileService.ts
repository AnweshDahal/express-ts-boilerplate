import { eq, lt, and } from 'drizzle-orm';
import {
  developerProfiles,
  skills,
  developerSkill as developerSkill, // use as to set alias
} from '../../../../db/schema';
import db from '../../../../db/setup';

export default async function listDeveloperProfileService(
  query: any,
): Promise<Array<any>> {
  const rows = await db
    .select({
      developerProfile: {
        id: developerProfiles.id,
        firstName: developerProfiles.firstName,
        middleName: developerProfiles.middleName,
        lastName: developerProfiles.lastName,
        email: developerProfiles.email,
      },
      skills: {
        id: skills.id,
        name: skills.name,
      },
    })
    .from(developerProfiles)
    .leftJoin(
      developerSkill,
      and(
        eq(developerSkill.developerId, developerProfiles.id),
        eq(developerSkill.isDeleted, false),
      ),
    )
    .leftJoin(
      skills,
      and(eq(skills.id, developerSkill.skillId), eq(skills.isDeleted, false)),
    )
    // ? This is used for filtering
    // .leftJoin(
    //   experiences,
    //   and(
    //     eq(experiences.developerId, developerProfiles.id),
    //     eq(experiences.isDeleted, false),
    //   ),
    // )
    .where(
      and(
        eq(developerProfiles.isDeleted, false), // undefined conditions are ignored in and()
        // Filter using queries
        // query.experienceYears
        //   ? lt(
        //       experiences.startYear,
        //       new Date().getFullYear() - query.experienceYears,
        //     )
        //   : undefined,
      ),
    );

  const developerProfiles_ = rows.reduce<
    Record<number, { developerProfile: any; skills: any }>
  >((acc, row) => {
    const developerProfile = row.developerProfile;
    const skills = row.skills;

    if (!acc[developerProfile.id]) {
      acc[developerProfile.id] = {
        developerProfile,
        skills: new Object(),
      };
    }

    if (skills) {
      acc[developerProfile.id].skills[skills.id] = skills.name;
    }
    return acc;
  }, {});

  return Object.values(developerProfiles_);
}
