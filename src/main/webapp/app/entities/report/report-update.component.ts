import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuizService from '../quiz/quiz.service';
import { IQuiz } from '@/shared/model/quiz.model';

import PlayerService from '../player/player.service';
import { IPlayer } from '@/shared/model/player.model';

import AlertService from '@/shared/alert/alert.service';
import { IReport, Report } from '@/shared/model/report.model';
import ReportService from './report.service';

const validations: any = {
  report: {
    name: {}
  }
};

@Component({
  validations
})
export default class ReportUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reportService') private reportService: () => ReportService;
  public report: IReport = new Report();

  @Inject('quizService') private quizService: () => QuizService;

  public quizzes: IQuiz[] = [];

  @Inject('playerService') private playerService: () => PlayerService;

  public players: IPlayer[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reportId) {
        vm.retrieveReport(to.params.reportId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.report.id) {
      this.reportService()
        .update(this.report)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.report.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.reportService()
        .create(this.report)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.report.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveReport(reportId): void {
    this.reportService()
      .find(reportId)
      .then(res => {
        this.report = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.quizService()
      .retrieve()
      .then(res => {
        this.quizzes = res.data;
      });
    this.playerService()
      .retrieve()
      .then(res => {
        this.players = res.data;
      });
  }
}
