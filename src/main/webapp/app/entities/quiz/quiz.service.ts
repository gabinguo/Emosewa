import axios from 'axios';

import { IQuiz } from '@/shared/model/quiz.model';

const baseApiUrl = 'api/quizzes';

export default class QuizService {
  public find(id: number): Promise<IQuiz> {
    return new Promise<IQuiz>(resolve => {
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

  public create(entity: IQuiz): Promise<IQuiz> {
    return new Promise<IQuiz>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity: IQuiz): Promise<IQuiz> {
    return new Promise<IQuiz>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
