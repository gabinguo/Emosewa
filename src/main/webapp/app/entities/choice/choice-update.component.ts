import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuestionService from '../question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import AlertService from '@/shared/alert/alert.service';
import { IChoice, Choice } from '@/shared/model/choice.model';
import ChoiceService from './choice.service';

const validations: any = {
  choice: {
    description: {},
    pictureURL: {},
    videoURL: {}
  }
};

@Component({
  validations
})
export default class ChoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('choiceService') private choiceService: () => ChoiceService;
  public choice: IChoice = new Choice();

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.choiceId) {
        vm.retrieveChoice(to.params.choiceId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.choice.id) {
      this.choiceService()
        .update(this.choice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.choice.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.choiceService()
        .create(this.choice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.choice.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveChoice(choiceId): void {
    this.choiceService()
      .find(choiceId)
      .then(res => {
        this.choice = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.questionService()
      .retrieve()
      .then(res => {
        this.questions = res.data;
      });
  }
}
