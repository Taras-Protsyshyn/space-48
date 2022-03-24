
import { prop } from '@typegoose/typegoose';
import { UserRoles } from '@space-48/shared/constants';

export class UserModel {
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
