import mongoose from 'mongoose';
import { DuplicatedEmail } from '../errors';
import { PasswordHash } from '../utils/password-hash';

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
};

export interface UserModel extends mongoose.Model<UserDocument> {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre(
  'save',
  async function validateUniqueness(this: UserDocument, next) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const existingUser = await User.findOne({ email: this.email });

    if (existingUser) {
      throw new DuplicatedEmail();
    }

    next();
  }
);

userSchema.pre('save', function preHashPassword(this: UserDocument) {
  const newPassword = this.isModified('password') ? this.get('password') : null;

  if (newPassword) {
    this.set(
      'password',
      PasswordHash.toHashSync({
        password: newPassword,
      })
    );
  }
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
