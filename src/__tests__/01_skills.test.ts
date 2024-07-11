import supertest from 'supertest';
import { faker, ur } from '@faker-js/faker';
import { app } from '..';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

describe('Skills', () => {
  const token = jsonwebtoken.sign(
    {
      user: 'test',
    },
    process.env.JWT_SECRET || '',
    {
      expiresIn: '2m',
    },
  );
  describe('Create Skill', () => {
    it('Should return 200', async () => {
      const payload = {
        name: faker.word.noun(),
      };
      const url = '/v1/sudo/skill';

      const { body, statusCode } = await supertest(app)
        .post(url)
        .send(payload)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body.data).toEqual({
        name: expect.any(String),
      });
    });
  });

  describe('Fetch Skills', () => {
    it('Should return 200 and array of skills', async () => {
      const url = '/v1/sudo/skill';

      const { statusCode, body } = await supertest(app)
        .get(url)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toBe(200);
      expect(body).toEqual({
        success: true,
        data: expect.any(Array),
        message: expect.any(String),
      });
    });
  });
});
