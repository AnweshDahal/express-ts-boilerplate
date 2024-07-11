import CreateDeveloperProfileInterface from '../../../../interfaces/developerProfile/createDeveloperProfileInterface';
import { eq, or, and } from 'drizzle-orm';
import { developerProfiles } from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function createDeveloperProfileService(
  developerProfileDetails: CreateDeveloperProfileInterface,
) {
  const developerProfileExists = await db
    .select({
      id: developerProfiles.id,
      email: developerProfiles.email,
      linkedinProfile: developerProfiles.linkedinProfile,
      githubProfile: developerProfiles.githubProfile,
    })
    .from(developerProfiles)
    .where(
      and(
        or(
          eq(developerProfiles.email, developerProfileDetails.email),
          eq(
            developerProfiles.linkedinProfile,
            developerProfileDetails.linkedinProfile,
          ),
          eq(
            developerProfiles.githubProfile,
            developerProfileDetails.githubProfile,
          ),
        ),
        eq(developerProfiles.isDeleted, false),
      ),
    )
    .limit(1);

  if (developerProfileExists.length > 0) {
    const error: ErrorInterface = {
      status: 409,
      message:
        'The email or LinkedIn profile or GitHub profile is already taken ',
    };

    throw error;
  }

  const developerProfile = await db
    .insert(developerProfiles)
    .values({
      firstName: developerProfileDetails.firstName,
      middleName: developerProfileDetails.middleName,
      lastName: developerProfileDetails.lastName,
      website: developerProfileDetails.website,
      linkedinProfile: developerProfileDetails.linkedinProfile,
      githubProfile: developerProfileDetails.githubProfile,
      summary: developerProfileDetails.summary,
      country: developerProfileDetails.country,
      region: developerProfileDetails.region,
      city: developerProfileDetails.city,
      email: developerProfileDetails.email,
    })
    .returning()
    .onConflictDoNothing();

  if (developerProfile.length < 1) {
    const error: ErrorInterface = {
      status: 500,
      message: 'Developer profile not created',
    };

    throw error;
  }

  return developerProfile[0];
}
