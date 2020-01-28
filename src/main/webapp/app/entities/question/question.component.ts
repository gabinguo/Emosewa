import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuestion } from '@/shared/model/question.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import QuestionService from './question.service';

@Component
export default class Question extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('questionService') private questionService: () => QuestionService;
  private removeId: number = null;
  public questions: IQuestion[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuestions();
  }

  public clear(): void {
    this.retrieveAllQuestions();
  }

  public retrieveAllQuestions(): void {
    this.isFetching = true;

    this.questionService()
      .retrieve()
      .then(
        res => {
          this.questions = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IQuestion): void {
    this.removeId = instance.id;
  }

  public removeQuestion(): void {
    this.questionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.question.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllQuestions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
