import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IQuizType, QuizType } from '@/shared/model/quiz-type.model';
import QuizTypeService from './quiz-type.service';

const validations: any = {
  quizType: {
    typeName: {}
  }
};

@Component({
  validations
})
export default class QuizTypeUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('quizTypeService') private quizTypeService: () => QuizTypeService;
  public quizType: IQuizType = new QuizType();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.quizTypeId) {
        vm.retrieveQuizType(to.params.quizTypeId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.quizType.id) {
      this.quizTypeService()
        .update(this.quizType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.quizType.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.quizTypeService()
        .create(this.quizType)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.quizType.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveQuizType(quizTypeId): void {
    this.quizTypeService()
      .find(quizTypeId)
      .then(res => {
        this.quizType = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
