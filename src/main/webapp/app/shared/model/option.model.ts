import { IQuestion } from '@/shared/model/question.model';

export const enum Level {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface IOption {
  id?: number;
  description?: string;
  pictureURL?: string;
  videoURL?: string;
  level?: Level;
  question?: IQuestion;
}

export class Option implements IOption {
  constructor(
    public id?: number,
    public description?: string,
    public pictureURL?: string,
    public videoURL?: string,
    public level?: Level,
    public question?: IQuestion
  ) {}
}
