import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IChoice } from '@/shared/model/choice.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ChoiceService from './choice.service';

@Component
export default class Choice extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('choiceService') private choiceService: () => ChoiceService;
  private removeId: number = null;
  public choices: IChoice[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllChoices();
  }

  public clear(): void {
    this.retrieveAllChoices();
  }

  public retrieveAllChoices(): void {
    this.isFetching = true;

    this.choiceService()
      .retrieve()
      .then(
        res => {
          this.choices = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IChoice): void {
    this.removeId = instance.id;
  }

  public removeChoice(): void {
    this.choiceService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.choice.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllChoices();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
