import axios from 'axios';

import { IQuizType } from '@/shared/model/quiz-type.model';

const baseApiUrl = 'api/quiz-types';

export default class QuizTypeService {
  public find(id: number): Promise<IQuizType> {
    return new Promise<IQuizType>(resolve => {
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

  public create(entity: IQuizType): Promise<IQuizType> {
    return new Promise<IQuizType>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IQuizType): Promise<IQuizType> {
    return new Promise<IQuizType>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
