import { IQuizType } from '@/shared/model/quiz-type.model';
import { IQuestion } from '@/shared/model/question.model';

export interface IQuiz {
  id?: number;
  name?: string;
  type?: IQuizType;
  questions?: IQuestion[];
}

export class Quiz implements IQuiz {
  constructor(public id?: number, public name?: string, public type?: IQuizType, public questions?: IQuestion[]) {}
}
