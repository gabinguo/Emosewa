import { IQuestionType } from '@/shared/model/question-type.model';
import { IOption } from '@/shared/model/option.model';
import { IQuiz } from '@/shared/model/quiz.model';

export interface IQuestion {
  id?: number;
  description?: string;
  pictureURL?: string;
  videoURL?: string;
  type?: IQuestionType;
  options?: IOption[];
  quizzes?: IQuiz[];
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public description?: string,
    public pictureURL?: string,
    public videoURL?: string,
    public type?: IQuestionType,
    public options?: IOption[],
    public quizzes?: IQuiz[]
  ) {}
}
