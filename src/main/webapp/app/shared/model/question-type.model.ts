export interface IQuestionType {
  id?: number;
  typeName?: string;
}

export class QuestionType implements IQuestionType {
  constructor(public id?: number, public typeName?: string) {}
}
