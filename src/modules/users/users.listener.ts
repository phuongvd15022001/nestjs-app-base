/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { User } from '@prisma/client';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';

const onCreated = async (params, next): Promise<any> => {
  if (params.model == 'User') {
    if (params.action === 'create') {
      const password = params.args['data'].password;

      const encryptedPass = await AuthHelpers.hash(password as string);

      params.args['data'] = {
        ...params.args['data'],
        password: encryptedPass,
      };
    }

    if (params.action === 'createMany') {
      const users = params.args?.data;

      if (Array.isArray(users)) {
        params.args.data = await Promise.all(
          users.map(async (user) => {
            if (user.password) {
              const encryptedPass = await AuthHelpers.hash(
                user.password as string,
              );
              return { ...user, password: encryptedPass } as User;
            }

            return user as User;
          }),
        );
      }
    }
  }

  return next(params);
};

export const UserListener = {
  onCreated,
};
