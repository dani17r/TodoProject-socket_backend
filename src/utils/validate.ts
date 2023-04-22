import { SocketT } from '@modules/interfaces';

export default (socket: SocketT) => {
  const validation = async (data: Object, rule: any, action: Function) => {
    const { error, value } = rule.validate(data);

    if (error != (null || undefined)) {
      socket.emit('login/error', {
        field: error.details.map((d: any) => d.context.label)[0],
        message: error.details.map((d: any) => d.message.replace(/\"/g, ''))[0]
      });
    } else await action(value);
  };

  return validation;
};
