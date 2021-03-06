import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import QuestionTypeService from '../question-type/question-type.service';
import { IQuestionType } from '@/shared/model/question-type.model';

import ChoiceService from '../choice/choice.service';
import { IChoice } from '@/shared/model/choice.model';

import QuizService from '../quiz/quiz.service';
import { IQuiz } from '@/shared/model/quiz.model';

import AlertService from '@/shared/alert/alert.service';
import { IQuestion, Question } from '@/shared/model/question.model';
import QuestionService from './question.service';

const validations: any = {
  question: {
    description: {},
    pictureURL: {},
    videoURL: {},
    level: {},
    answer: {}
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

  @Inject('choiceService') private choiceService: () => ChoiceService;

  public choices: IChoice[] = [];

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

  created(): void {
    this.question.choices = [];
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
    this.choiceService()
      .retrieve()
      .then(res => {
        this.choices = res.data;
      });
    this.quizService()
      .retrieve()
      .then(res => {
        this.quizzes = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
