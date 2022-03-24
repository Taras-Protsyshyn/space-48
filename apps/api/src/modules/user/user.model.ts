/* eslint-disable @typescript-eslint/no-empty-interface */
import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

import { UserRoles } from '@space-48/shared/constants';

export interface UserModel extends Base { }
export class UserModel extends TimeStamps {
  @prop()
  login: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop()
  passwordHash: string;

  @prop()
  role: UserRoles;
}
