import { createSession, getEmailJwt, messages, removeSession } from './options';
import { LoginI, RegisterI } from '@modules/users/interfaces';
import { rules } from '@modules/users/validate';
import { removeProperty } from '@utils/actions';
import { io } from '@main/server';
import { isEmpty } from 'lodash';

import User from '@modules/users/model';
import validate from '@utils/validate';


export default () => {
  io.of('/auth').on('connection', socket => {
    const validation = validate(socket);

    //Login
    socket.on('login', async (form: LoginI) => {
      const action = async (values: LoginI) => {
        const credential = { email: values.email };
        const isUser = await User.findOne(credential).select('+password');
        const msg = messages.login;

        if (!isEmpty(isUser))
          if (await isUser.passwordCompare(values.password)) {
            const session = await createSession(credential, isUser._id);

            socket.emit('login/success', msg.success(session));
          } else socket.emit('login/error', msg.password);
        else socket.emit('login/error', msg.userNotFount);

        socket.disconnect(true);
      };

      await validation(form, rules.login, action);
    });

    //Register
    socket.on('register', async (form: RegisterI) => {
      const action = async (values: RegisterI) => {
        const msg = messages.register;

        if (!(await User.exists({ email: values.email }))) {
          let user = await User.create(values);
          user = removeProperty(user, 'password');

          if (!isEmpty(user)) socket.emit('register/success', msg.success);
          else socket.emit('register/error', msg.notCreated);
        } else socket.emit('register/error', msg.email);

        socket.disconnect(true);
      };

      await validation(form, rules.register, action);
    });

    //Status
    socket.on('status', async (token: string) => {
      const msg = messages.status;
      if (!isEmpty(token)) {
        const isUser = getEmailJwt(token);

        if (!isEmpty(isUser)) {
          const user = await User.findOne({ email: isUser.email });
          socket.emit('status/response', msg.success(user));
        } else socket.emit('status/response', msg.error);
      } else socket.emit('status/response', msg.error);
    });

    //Logout
    socket.on('logout', async (token: string) => {
      const msg = messages.logout;

      const isUser = getEmailJwt(token);

      if (!isEmpty(isUser)) {
        let user = await User.findOne({ email: isUser.email });
        let isUpdate = removeSession(user, token);

        if (isUpdate) socket.emit('logout/success', msg.success);
        else socket.emit('logout/error', msg.error);
      } else socket.emit('logout/error', msg.error);
    });
  });
};
