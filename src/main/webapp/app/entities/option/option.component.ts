import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOption } from '@/shared/model/option.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import OptionService from './option.service';

@Component
export default class Option extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('optionService') private optionService: () => OptionService;
  private removeId: number = null;
  public options: IOption[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllOptions();
  }

  public clear(): void {
    this.retrieveAllOptions();
  }

  public retrieveAllOptions(): void {
    this.isFetching = true;

    this.optionService()
      .retrieve()
      .then(
        res => {
          this.options = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IOption): void {
    this.removeId = instance.id;
  }

  public removeOption(): void {
    this.optionService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.option.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllOptions();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
