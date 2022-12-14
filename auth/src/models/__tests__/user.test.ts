import User from '../user';

it('should not save a new user if the email is already in the database', async () => {
  const userInfo = {
    email: 'test@test.com',
    password: 'Validpassword1',
  };

  const newUser1 = await User.create(userInfo);
  expect(newUser1).toBeDefined();
  expect(newUser1.email).toEqual(userInfo.email);

  let err;
  try {
    await User.create(userInfo); // ERROR
  } catch (e) {
    err = e;
  }

  expect(err).toBeDefined();
});
