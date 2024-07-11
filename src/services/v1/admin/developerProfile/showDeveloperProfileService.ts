import { eq, and, or } from 'drizzle-orm';
import {
  developerProfiles,
  skills,
  developerSkill as developerSkill,
} from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function showDeveloperProfileService(
  developerProfileId: number,
) {
  const rows = await db
    .select({
      developerProfile: {
        id: developerProfiles.id,
        firstName: developerProfiles.firstName,
        middleName: developerProfiles.middleName,
        lastName: developerProfiles.lastName,
        website: developerProfiles.website,
        linkedinProfile: developerProfiles.linkedinProfile,
        githubProfile: developerProfiles.githubProfile,
        summary: developerProfiles.summary,
        country: developerProfiles.country,
        region: developerProfiles.region,
        city: developerProfiles.city,
        email: developerProfiles.email,
      },

      skills: {
        id: skills.id,
        name: skills.name,
      },
    })
    .from(developerProfiles)
    // .leftJoin(
    //   experiences,
    //   and(
    //     eq(experiences.developerId, developerProfiles.id),
    //     eq(experiences.isDeleted, false),
    //   ),
    // )
    .leftJoin(
      developerSkill,
      and(
        eq(developerSkill.developerId, developerProfiles.id),
        // or(
        //   eq(developerSkill.educationId, educations.id),
        //   eq(developerSkill.experienceId, experiences.id),
        //   eq(developerSkill.trainingId, trainings.id),
        // ),
        eq(developerSkill.isDeleted, false),
      ),
    )
    .leftJoin(
      skills,
      and(eq(developerSkill.skillId, skills.id), eq(skills.isDeleted, false)),
    )
    .where(
      and(
        eq(developerProfiles.id, developerProfileId),
        eq(developerProfiles.isDeleted, false),
      ),
    );

  if (rows.length < 1) {
    const error: ErrorInterface = {
      status: 404,
      message: 'Developer profile not found',
    };

    throw error;
  }

  // Aggregate the result

  const developerProfile = rows.reduce<
    Record<
      number,
      {
        developerProfile: any;
        educations: any;
        experiences: any;
        trainings: any;
        skills: any;
      }
    >
  >((acc, row) => {
    const developerProfile = row.developerProfile;
    const educations = row.educations;
    const experiences = row.experiences;
    const companies = row.companies;
    const trainings = row.trainings;
    const skills = row.skills;

    if (!acc[developerProfile.id]) {
      acc[developerProfile.id] = {
        developerProfile,
        // educations: new Object(),
        skills: new Object(),
      };
    }

    // if (educations) {
    //   acc[developerProfile.id].educations[educations.id] = educations;

    //   // ? Insert Education Skills
    //   acc[developerProfile.id].educations[educations.id].skills = new Object();
    //   if (skills) {
    //     acc[developerProfile.id].educations[educations.id].skills[skills.id] =
    //       skills.name;
    //   }
    // }

    if (skills) {
      acc[developerProfile.id].skills[skills.id] = skills;
    }

    return acc;
  }, {});

  // Formatting Response
  const developerProfileData = developerProfile[developerProfileId];
  const response = {
    developerProfile: developerProfileData.developerProfile,
    skills: Object.values(developerProfileData.skills),
  };

  return response;
}
