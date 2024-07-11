import { relations } from 'drizzle-orm';

import {
  serial,
  integer,
  varchar,
  pgTable,
  text,
  pgEnum,
  smallint,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  middleName: varchar('middle_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  userName: varchar('username', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const developerProfiles = pgTable('developer_profiles', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  middleName: varchar('middle_name', { length: 256 }),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  website: varchar('website', { length: 256 }),
  linkedinProfile: varchar('linkedin_profile', { length: 256 })
    .notNull()
    .unique(),
  githubProfile: varchar('github_profile', { length: 256 }).notNull().unique(),
  summary: text('summary'),
  country: varchar('country', { length: 256 }).notNull(),
  region: varchar('region', { length: 256 }),
  city: varchar('city', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const monthEnum = pgEnum('months', [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

export const employmentTypeEnum = pgEnum('employment_types', [
  'Full-time',
  'Part-time',
  'Self-employed',
  'Freelance',
  'Contract',
  'Internship',
  'Apprenticeship',
]);

export const locationTypeEnum = pgEnum('location_types', [
  'On-site',
  'Remote',
  'Hybrid',
]);

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const developerSkill = pgTable(
  'developer_experience_education_training_skills',
  {
    id: serial('id').primaryKey(),
    developerId: integer('developer_id').references(
      () => developerProfiles.id,
      { onDelete: 'cascade', onUpdate: 'cascade' },
    ),
    skillId: integer('skill_id').references(() => skills.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    isDeleted: boolean('is_deleted').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
);

// Relations
export const developerRelations = relations(developerProfiles, ({ many }) => ({
  developerSkills: many(developerSkill),
}));

export const developerSkillRelations = relations(developerSkill, ({ one }) => ({
  developerProfile: one(developerProfiles, {
    fields: [developerSkill.developerId],
    references: [developerProfiles.id],
  }),
  skill: one(skills, {
    fields: [developerSkill.developerId],
    references: [skills.id],
  }),
}));
