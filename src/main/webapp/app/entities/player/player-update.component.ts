import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ReportService from '../report/report.service';
import { IReport } from '@/shared/model/report.model';

import AlertService from '@/shared/alert/alert.service';
import { IPlayer, Player } from '@/shared/model/player.model';
import PlayerService from './player.service';

const validations: any = {
  player: {
    name: {},
    password: {},
    email: {}
  }
};

@Component({
  validations
})
export default class PlayerUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('playerService') private playerService: () => PlayerService;
  public player: IPlayer = new Player();

  @Inject('reportService') private reportService: () => ReportService;

  public reports: IReport[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.playerId) {
        vm.retrievePlayer(to.params.playerId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.player.id) {
      this.playerService()
        .update(this.player)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.player.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.playerService()
        .create(this.player)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.player.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrievePlayer(playerId): void {
    this.playerService()
      .find(playerId)
      .then(res => {
        this.player = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.reportService()
      .retrieve()
      .then(res => {
        this.reports = res.data;
      });
  }
}
