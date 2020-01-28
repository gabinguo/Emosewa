import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReport } from '@/shared/model/report.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import ReportService from './report.service';

@Component
export default class Report extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('reportService') private reportService: () => ReportService;
  private removeId: number = null;
  public reports: IReport[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReports();
  }

  public clear(): void {
    this.retrieveAllReports();
  }

  public retrieveAllReports(): void {
    this.isFetching = true;

    this.reportService()
      .retrieve()
      .then(
        res => {
          this.reports = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IReport): void {
    this.removeId = instance.id;
  }

  public removeReport(): void {
    this.reportService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.report.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllReports();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
