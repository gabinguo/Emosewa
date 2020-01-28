import { IReport } from '@/shared/model/report.model';

export interface IPlayer {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  reports?: IReport[];
}

export class Player implements IPlayer {
  constructor(public id?: number, public name?: string, public password?: string, public email?: string, public reports?: IReport[]) {}
}
