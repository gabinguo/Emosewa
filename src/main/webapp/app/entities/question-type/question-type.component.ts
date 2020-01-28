import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IQuestionType } from '@/shared/model/question-type.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import QuestionTypeService from './question-type.service';

@Component
export default class QuestionType extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  private removeId: number = null;
  public questionTypes: IQuestionType[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllQuestionTypes();
  }

  public clear(): void {
    this.retrieveAllQuestionTypes();
  }

  public retrieveAllQuestionTypes(): void {
    this.isFetching = true;

    this.questionTypeService()
      .retrieve()
      .then(
        res => {
          this.questionTypes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IQuestionType): void {
    this.removeId = instance.id;
  }

  public removeQuestionType(): void {
    this.questionTypeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.questionType.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllQuestionTypes();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
