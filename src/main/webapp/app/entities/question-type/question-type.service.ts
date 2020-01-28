import axios from 'axios';

import { IQuestionType } from '@/shared/model/question-type.model';

const baseApiUrl = 'api/question-types';

export default class QuestionTypeService {
  public find(id: number): Promise<IQuestionType> {
    return new Promise<IQuestionType>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity: IQuestionType): Promise<IQuestionType> {
    return new Promise<IQuestionType>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IQuestionType): Promise<IQuestionType> {
    return new Promise<IQuestionType>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
