import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUserInput{
    avatarPath  :string;
    username    :string;
    email       :string;
    password    :string;
}

export interface UserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: String): Promise<boolean>;//
}

const userSchema = new mongoose.Schema<IUserInput>(
  {
    avatarPath: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return await next();
  }
  //console.log("\n\n pre error \n\n");
 // aquí debajo está el error
  //const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));
  // hash and replace password
  //const hash = await bcrypt.hashSync(user.password, salt);
  //user.password = hash;
  //console.log("\n\npost salt error: "+user.password+"\n\n");
  return await next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};/**/

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;

/*import mongoose from 'mongoose';

export interface IUser extends mongoose.Document{
    avatarPath:String;
    username:String;
    email:String;
    password:String;
}

export const userSchema = new mongoose.Schema({
    avatarPath: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    somethingElse: String,
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
*/
