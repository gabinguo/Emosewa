import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuizType } from '@/shared/model/quiz-type.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import QuizTypeService from './quiz-type.service';

@Component
export default class QuizType extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('quizTypeService') private quizTypeService: () => QuizTypeService;
  private removeId: number = null;
  public quizTypes: IQuizType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuizTypes();
  }

  public clear(): void {
    this.retrieveAllQuizTypes();
  }

  public retrieveAllQuizTypes(): void {
    this.isFetching = true;

    this.quizTypeService()
      .retrieve()
      .then(
        res => {
          this.quizTypes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IQuizType): void {
    this.removeId = instance.id;
  }

  public removeQuizType(): void {
    this.quizTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.quizType.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllQuizTypes();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
