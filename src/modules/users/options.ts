import { CredentialI, CredentialT, ResultLoginI, UserI } from './interfaces';
import User from '@modules/users/model';
import config from '@main/config';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { remove } from 'lodash';

export const getEmailJwt = (token: string) => {
  return jwt.verify(token, config.SECRET, (val, data) =>
    val ? {} : data
  ) as unknown as CredentialI;
};

export const createSession = async (
  credential: CredentialI,
  _id: Types.ObjectId
): Promise<ResultLoginI> => {
  const time = { expiresIn: config.TIME };
  const token = jwt.sign(credential, config.SECRET, time);

  const session = {
    start: new Date().getTime(),
    token
  };

  let user = await User.findOneAndUpdate(
    { _id },
    { $push: { sessions: session } },
    { returnOriginal: false }
  );
  user.sessions = undefined;

  return { user, token };
};

export const removeSession = async (user: UserI, token: string) => {
  remove(user.sessions, session => session.token == token);

  const isUpdate = await User.findOneAndUpdate(
    { email: user.email },
    { $set: { sessions: user.sessions } },
    { returnOriginal: false }
  );

  return isUpdate;
};

export const messages = {
  login: {
    success: (session: ResultLoginI) => ({
      notify: {
        message: 'login success',
        field: 'notify'
      },
      token: session.token,
      user: session.user
    }),
    password: {
      message: 'Incorrect password',
      field: 'password'
    },
    userNotFount: {
      message: 'There is no user with this email',
      field: 'email'
    }
  },
  register: {
    email: {
      message: 'Email is already in use',
      field: 'email'
    },
    success: {
      notify: {
        message: 'User successfully registered',
        field: 'notify'
      }
    },
    notCreated: {
      message: 'Error creating a user',
      field: 'notify'
    }
  },
  status: {
    success: (user: CredentialI) => ({ user, isSession: true }),
    error: { user: null, isSession: false }
  },
  logout: {
    success: {
      notify: {
        message: 'Logout successful',
        field: 'notify'
      }
    },
    error: {
      message: 'The session could not be closed',
      field: 'notify'
    }
  }
};
