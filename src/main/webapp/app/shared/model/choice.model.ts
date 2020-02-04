import { IQuestion } from '@/shared/model/question.model';

export interface IChoice {
  id?: number;
  description?: string;
  pictureURL?: string;
  videoURL?: string;
  questions?: IQuestion[];
}

export class Choice implements IChoice {
  constructor(
    public id?: number,
    public description?: string,
    public pictureURL?: string,
    public videoURL?: string,
    public questions?: IQuestion[]
  ) {}
}
