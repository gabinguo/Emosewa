import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuestionService from '../question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import AlertService from '@/shared/alert/alert.service';
import { IOption, Option } from '@/shared/model/option.model';
import OptionService from './option.service';

const validations: any = {
  option: {
    description: {},
    pictureURL: {},
    videoURL: {},
    level: {}
  }
};

@Component({
  validations
})
export default class OptionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('optionService') private optionService: () => OptionService;
  public option: IOption = new Option();

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.optionId) {
        vm.retrieveOption(to.params.optionId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.option.id) {
      this.optionService()
        .update(this.option)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.option.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.optionService()
        .create(this.option)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.option.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveOption(optionId): void {
    this.optionService()
      .find(optionId)
      .then(res => {
        this.option = res;
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
