export interface IQuizType {
  id?: number;
  typeName?: string;
}

export class QuizType implements IQuizType {
  constructor(public id?: number, public typeName?: string) {}
}
