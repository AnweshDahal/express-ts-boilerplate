import { users } from '../schema';
import { encrypt } from '../../utils/password';
import moment from 'moment';
const userSeederData: Array<typeof users.$inferInsert> = [
  {
    firstName: 'Developer',
    lastName: 'Admin',
    userName: 'devadmin',
    password: encrypt('I.am.devadmin'),
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    firstName: 'HR',
    lastName: 'Admin',
    userName: 'hradmin',
    password: encrypt('I.am.hr.admin'),
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default userSeederData;
