import { Types } from 'mongoose';
export interface ValidateAuthI {
  LoginI: {
    password: string;
    email: string;
  };
  StatusI: {
    token: string;
  };
}

export interface JwtI {
  model_id: Types.ObjectId;
  email: string;
}

interface ActionsAuthI extends Document {
  passwordCompare: (password: string) => Promise<boolean>;
}

interface SessionsI {
  status: Boolean;
  token: String;
}

export interface UserI extends ActionsAuthI {
  _id: Types.ObjectId;
  createdAt: Date;
  updateAt: Date;

  email: string;
  password: string;
  fullname: string;

  sessions: SessionsI[];
}

export interface RegisterI {
  email: string;
  password: string;
  fullname: string;
}

export interface LoginI {
  email: string;
  password: string;
}

export interface CredentialI {
  email: string
}
export type CredentialT = CredentialI | boolean;

export interface ResultLoginI {
  user: UserI;
  token: string;
}