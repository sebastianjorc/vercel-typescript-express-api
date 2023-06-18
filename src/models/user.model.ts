import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();



export interface IUserInput{
    avatarPath  :string;
    username    :string;
    email       :string;
    password    :string;
    level       :number;
    interest    :string;
    palette     :string;
}
export interface UserDocument extends IUserInput, mongoose.Document {
  createdAt: Date;  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;//
}
const userSchema = new mongoose.Schema<IUserInput>(
  {
    avatarPath: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    level: { type: Number, required: true, default: 0 },
    interest: { type: String, required: true, default: "animales" },
    palette: { type: String, required: true, default: "azul-naranjo" }
  },
  { timestamps: true  }
);
/*
userSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument;
  if (!user.isModified('password')) {
    return await next();
  }
  return await next();
});*/

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return await next();
  }
  
  console.log("\n\n pre error \n\n");
  // aquí debajo está el error
  const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR || '', 10); // El segundo argumento es la base numérica (10 para decimal)
  const salt = await bcrypt.genSalt(saltWorkFactor);
  // hash and replace password
  const hash = await bcrypt.hashSync(user.password, salt);
  console.log(` \nPassword: ${user.password}\n
                \nSalt: ${salt}\n
                \nHash: ${hash}\n`
                );
  user.password = hash;
  console.log("\n\npost salt error: "+user.password+"\n\n");
  return await next();
});


export interface IUserLoggin{
  email    :string;
  password :string;
}

const userLogginSchema = new mongoose.Schema<IUserLoggin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
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
