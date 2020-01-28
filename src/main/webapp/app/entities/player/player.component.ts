import { mixins } from 'vue-class-component';

import { Component, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IPlayer } from '@/shared/model/player.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import PlayerService from './player.service';

@Component
export default class Player extends mixins(Vue2Filters.mixin, AlertMixin) {
  @Inject('playerService') private playerService: () => PlayerService;
  private removeId: number = null;
  public players: IPlayer[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllPlayers();
  }

  public clear(): void {
    this.retrieveAllPlayers();
  }

  public retrieveAllPlayers(): void {
    this.isFetching = true;

    this.playerService()
      .retrieve()
      .then(
        res => {
          this.players = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IPlayer): void {
    this.removeId = instance.id;
  }

  public removePlayer(): void {
    this.playerService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('emosewaApp.player.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllPlayers();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
