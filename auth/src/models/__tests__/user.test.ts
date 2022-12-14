import { BaseCustomError, DuplicatedEmail } from '../../errors';
import User from '../user';

it('should not save a new user if the email is already in the database', async () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'Validpassword1',
  };

  const newUser1 = await User.create(userInfo);
  expect(newUser1).toBeDefined();
  expect(newUser1.email).toEqual(userInfo.email);

  let err: DuplicatedEmail | undefined;
  try {
    await User.create(userInfo); // ERROR
  } catch (e: any) {
    err = e;
  }

  const serializeErrorOutput = err ? err.serializeErrorOutput() : undefined;

  expect(err).toBeDefined();
  expect(err).toBeInstanceOf(BaseCustomError);
  expect(serializeErrorOutput).toBeDefined();
  expect(serializeErrorOutput?.errors[0].message).toEqual(
    'The email is already in the database'
  );
});
