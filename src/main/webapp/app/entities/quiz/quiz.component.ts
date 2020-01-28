import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuiz } from '@/shared/model/quiz.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import QuizService from './quiz.service';

@Component
export default class Quiz extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('quizService') private quizService: () => QuizService;
  private removeId: number = null;
  public quizzes: IQuiz[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuizs();
  }

  public clear(): void {
    this.retrieveAllQuizs();
  }

  public retrieveAllQuizs(): void {
    this.isFetching = true;

    this.quizService()
      .retrieve()
      .then(
        res => {
          this.quizzes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IQuiz): void {
    this.removeId = instance.id;
  }

  public removeQuiz(): void {
    this.quizService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.quiz.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllQuizs();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
