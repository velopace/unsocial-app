import request from 'supertest';
import app from '../../app';
import { SIGNUP_ROUTE } from '../signup';

/**
 * Valid email conditions:
 *    - Standard email formats from 'email-validator' package
 */
describe('test validity of email input', () => {
  let password = '';

  beforeAll(() => {
    password = 'Validpassword1';
  });

  it('should return 422 if the email is not provided', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ password }).expect(422);
  });

  it('should return 422 if the email is not valid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: 'invalidEmail', password })
      .expect(422);
  });

  it('should return 200 if the email is valid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email: 'test@test.com', password })
      .expect(200);
  });
});

/**
 * Valid password conditions:
 *    - At least 8 characters
 *    - At most 32 characters
 *    - One lowercase letter
 *    - One uppercase letter
 *    - One number
 */

describe('test validity of password input', () => {
  let email = '';

  beforeAll(() => {
    email = 'test@test.com';
  });

  it('should return 422 if the password is not provided', async () => {
    await request(app).post(SIGNUP_ROUTE).send({ email }).expect(422);
  });

  it('should return 422 if the password contains less than 8 characters', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'Valid12' })
      .expect(422);
  });

  it('should return 422 if the password contains more than 32 characters', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'Valid12Valid12Valid12Valid12Valid12' })
      .expect(422);
  });

  it('should return 422 if the password does not contain one lower case letter', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'VALID12VALID12' })
      .expect(422);
  });

  it('should return 422 if the password does not contain one upper case letter', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'valid12valid12' })
      .expect(422);
  });

  it('should return 422 if the password does not contain one number', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'Validvalid' })
      .expect(422);
  });

  it('should return 200 if the password is valid', async () => {
    await request(app)
      .post(SIGNUP_ROUTE)
      .send({ email, password: 'Validpassword1' })
      .expect(200);
  });
});
