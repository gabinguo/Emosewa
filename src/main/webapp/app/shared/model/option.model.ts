import { IQuestion } from '@/shared/model/question.model';

export interface IOption {
  id?: number;
  description?: string;
  pictureURL?: string;
  videoURL?: string;
  questions?: IQuestion[];
}

export class Option implements IOption {
  constructor(
    public id?: number,
    public description?: string,
    public pictureURL?: string,
    public videoURL?: string,
    public questions?: IQuestion[]
  ) {}
}
