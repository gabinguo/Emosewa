import { Component, Vue, Inject } from 'vue-property-decorator';

import { IChoice } from '@/shared/model/choice.model';
import ChoiceService from './choice.service';

@Component
export default class ChoiceDetails extends Vue {
  @Inject('choiceService') private choiceService: () => ChoiceService;
  public choice: IChoice = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.choiceId) {
        vm.retrieveChoice(to.params.choiceId);
      }
    });
  }

  public retrieveChoice(choiceId) {
    this.choiceService()
      .find(choiceId)
      .then(res => {
        this.choice = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
