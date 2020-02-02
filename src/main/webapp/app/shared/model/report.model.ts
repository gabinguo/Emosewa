import { IUser } from '@/shared/model/user.model';

export interface IReport {
  id?: number;
  name?: string;
  user?: IUser;
}

export class Report implements IReport {
  constructor(public id?: number, public name?: string, public user?: IUser) {}
}
