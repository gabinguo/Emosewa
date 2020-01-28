import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuestionTypeService from '../question-type/question-type.service';
import { IQuestionType } from '@/shared/model/question-type.model';

import OptionService from '../option/option.service';
import { IOption } from '@/shared/model/option.model';

import QuizService from '../quiz/quiz.service';
import { IQuiz } from '@/shared/model/quiz.model';

import AlertService from '@/shared/alert/alert.service';
import { IQuestion, Question } from '@/shared/model/question.model';
import QuestionService from './question.service';

const validations: any = {
  question: {
    description: {},
    pictureURL: {},
    videoURL: {}
  }
};

@Component({
  validations
})
export default class QuestionUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('questionService') private questionService: () => QuestionService;
  public question: IQuestion = new Question();

  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;

  public questionTypes: IQuestionType[] = [];

  @Inject('optionService') private optionService: () => OptionService;

  public options: IOption[] = [];

  @Inject('quizService') private quizService: () => QuizService;

  public quizzes: IQuiz[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionId) {
        vm.retrieveQuestion(to.params.questionId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.question.id) {
      this.questionService()
        .update(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.question.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.questionService()
        .create(this.question)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('emosewaApp.question.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveQuestion(questionId): void {
    this.questionService()
      .find(questionId)
      .then(res => {
        this.question = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.questionTypeService()
      .retrieve()
      .then(res => {
        this.questionTypes = res.data;
      });
    this.optionService()
      .retrieve()
      .then(res => {
        this.options = res.data;
      });
    this.quizService()
      .retrieve()
      .then(res => {
        this.quizzes = res.data;
      });
  }
}
