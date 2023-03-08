import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserInput{
    avatarPath  :string;
    username    :string;
    email       :string;
    password    :string;
    level       :number;
}

export interface IUserLoggin{
  email    :string;
  password :string;
}

export interface UserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;//
}

const userLogginSchema = new mongoose.Schema<IUserLoggin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const userSchema = new mongoose.Schema<IUserInput>(
  {
    avatarPath: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    level: { type: Number, default: 0 }
  },
  { timestamps: true  }
);

userSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument;
  if (!user.isModified('password')) {
    return await next();
  }
  return await next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export const userLogginModel = mongoose.model('UserLoggin', userLogginSchema);

export default UserModel;
