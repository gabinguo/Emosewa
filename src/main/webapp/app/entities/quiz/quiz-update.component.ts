import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuizTypeService from '../quiz-type/quiz-type.service';
import { IQuizType } from '@/shared/model/quiz-type.model';

import QuestionService from '../question/question.service';
import { IQuestion } from '@/shared/model/question.model';

import AlertService from '@/shared/alert/alert.service';
import { IQuiz, Quiz } from '@/shared/model/quiz.model';
import QuizService from './quiz.service';

const validations: any = {
  quiz: {
    name: {}
  }
};

@Component({
  validations
})
export default class QuizUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('quizService') private quizService: () => QuizService;
  public quiz: IQuiz = new Quiz();

  @Inject('quizTypeService') private quizTypeService: () => QuizTypeService;

  public quizTypes: IQuizType[] = [];

  @Inject('questionService') private questionService: () => QuestionService;

  public questions: IQuestion[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.quizId) {
        vm.retrieveQuiz(to.params.quizId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.quiz.id) {
      this.quizService()
        .update(this.quiz)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.quiz.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.quizService()
        .create(this.quiz)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.quiz.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveQuiz(quizId): void {
    this.quizService()
      .find(quizId)
      .then(res => {
        this.quiz = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.quizTypeService()
      .retrieve()
      .then(res => {
        this.quizTypes = res.data;
      });
    this.questionService()
      .retrieve()
      .then(res => {
        this.questions = res.data;
      });
  }
}
