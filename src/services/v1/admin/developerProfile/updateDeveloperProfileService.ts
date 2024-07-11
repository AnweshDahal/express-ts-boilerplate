import UpdateDeveloperProfileInterface from '../../../../interfaces/developerProfile/updateDeveloperProfileInterface';
import { eq, and, or, not } from 'drizzle-orm';
import { developerProfiles } from '../../../../db/schema';
import db from '../../../../db/setup';

import ErrorInterface from '../../../../interfaces/error/errorInterface';

export default async function updateDeveloperProfileService(
  developerProfileDetails: UpdateDeveloperProfileInterface,
  developerProfileId: number,
) {
  // Check if the developer profile exists
  const developerExists = await db
    .select({ id: developerProfiles.id })
    .from(developerProfiles)
    .where(
      and(
        eq(developerProfiles.id, developerProfileId),
        eq(developerProfiles.isDeleted, false),
      ),
    )
    .limit(1);

  if (developerExists.length < 1) {
    const error: ErrorInterface = {
      status: 404,
      message: 'Developer profile not found',
    };

    throw error;
  }

  // Check if the new profile details are taken
  const profileDetailsTaken = await db
    .select({
      id: developerProfiles.id,
      linkedInProfile: developerProfiles.linkedinProfile,
      githubProfile: developerProfiles.githubProfile,
    })
    .from(developerProfiles)
    .where(
      and(
        not(eq(developerProfiles.id, developerProfileId)),
        or(
          eq(
            developerProfiles.linkedinProfile,
            developerProfileDetails.linkedinProfile as string,
          ),
          eq(
            developerProfiles.githubProfile,
            developerProfileDetails.githubProfile as string,
          ),
        ),
        eq(developerProfiles.isDeleted, false),
      ),
    );

  if (profileDetailsTaken.length > 0) {
    const error: ErrorInterface = {
      status: 409,
      message: 'Profile details already taken',
    };

    throw error;
  }

  // ? Updating the Developer Profile
  const updatedDeveloperProfile = await db
    .update(developerProfiles)
    .set({ ...developerProfileDetails, updatedAt: new Date() })
    .where(
      and(
        eq(developerProfiles.id, developerProfileId),
        eq(developerProfiles.isDeleted, false),
      ),
    )
    .returning();

  if (updatedDeveloperProfile.length < 1) {
    const error: ErrorInterface = {
      status: 500,
      message: 'Developer profile not updated',
    };

    throw error;
  }

  return updatedDeveloperProfile[0];
}
