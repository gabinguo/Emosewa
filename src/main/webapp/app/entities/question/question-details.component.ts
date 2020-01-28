import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuestion } from '@/shared/model/question.model';
import QuestionService from './question.service';

@Component
export default class QuestionDetails extends Vue {
  @Inject('questionService') private questionService: () => QuestionService;
  public question: IQuestion = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionId) {
        vm.retrieveQuestion(to.params.questionId);
      }
    });
  }

  public retrieveQuestion(questionId) {
    this.questionService()
      .find(questionId)
      .then(res => {
        this.question = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
