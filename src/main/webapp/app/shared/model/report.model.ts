import { IQuiz } from '@/shared/model/quiz.model';
import { IPlayer } from '@/shared/model/player.model';

export interface IReport {
  id?: number;
  name?: string;
  quiz?: IQuiz;
  player?: IPlayer;
}

export class Report implements IReport {
  constructor(public id?: number, public name?: string, public quiz?: IQuiz, public player?: IPlayer) {}
}
