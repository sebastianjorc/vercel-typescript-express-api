import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface IActivityInput{
  enunciate        :string;
  supportImage     :string[];
  supportSound     :string[];
  supportVideo     :string[];
  interactionType  :string;
  answerImage      :string[];
  answerSound      :string[];
  answerText       :string[];
  correctAnswer    :string[];
  activityLevel    :string;
  bloomLevel       :string;
  interest         :string;
  object           :any[];
}

export interface IActivityLoggin{
  email    :string;
  password :string;
}

export interface ActivityDocument extends IActivityInput, mongoose.Document {
  createdAt: Date;  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;//
}