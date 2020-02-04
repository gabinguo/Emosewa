import { IQuestionType } from '@/shared/model/question-type.model';
import { IChoice } from '@/shared/model/choice.model';
import { IQuiz } from '@/shared/model/quiz.model';

export const enum Level {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export const enum CorrectNumber {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export interface IQuestion {
  id?: number;
  description?: string;
  pictureURL?: string;
  videoURL?: string;
  level?: Level;
  answer?: CorrectNumber;
  type?: IQuestionType;
  choices?: IChoice[];
  quizzes?: IQuiz[];
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public description?: string,
    public pictureURL?: string,
    public videoURL?: string,
    public level?: Level,
    public answer?: CorrectNumber,
    public type?: IQuestionType,
    public choices?: IChoice[],
    public quizzes?: IQuiz[]
  ) {}
}
