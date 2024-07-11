import LoginInterface from '../../../../interfaces/auth/loginInterface';
import { sql } from 'drizzle-orm';
import { users } from '../../../../db/schema';
import db from '../../../../db/setup';
import { compare } from '../../../../utils/password';

export default async function loginService(loginDetails: LoginInterface) {
  const user = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      password: users.password,
    })
    .from(users)
    .where(sql`${users.userName} = ${loginDetails.userName}`)
    .limit(1);

  if (user.length < 1) {
    throw 404;
  } else if (!compare(loginDetails.password, user[0].password)) {
    throw 403;
  }

  return {
    id: user[0].id,
    bodyString: `${user[0].id}.${user[0].firstName}.${
      user[0].lastName
    }.${new Date()}`,
  };
}
