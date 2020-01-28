import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IQuestionType, QuestionType } from '@/shared/model/question-type.model';
import QuestionTypeService from './question-type.service';

const validations: any = {
  questionType: {
    typeName: {}
  }
};

@Component({
  validations
})
export default class QuestionTypeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  public questionType: IQuestionType = new QuestionType();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionTypeId) {
        vm.retrieveQuestionType(to.params.questionTypeId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.questionType.id) {
      this.questionTypeService()
        .update(this.questionType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.questionType.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.questionTypeService()
        .create(this.questionType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.questionType.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveQuestionType(questionTypeId): void {
    this.questionTypeService()
      .find(questionTypeId)
      .then(res => {
        this.questionType = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
