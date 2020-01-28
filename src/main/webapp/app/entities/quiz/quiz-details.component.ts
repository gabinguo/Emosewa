import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuiz } from '@/shared/model/quiz.model';
import QuizService from './quiz.service';

@Component
export default class QuizDetails extends Vue {
  @Inject('quizService') private quizService: () => QuizService;
  public quiz: IQuiz = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.quizId) {
        vm.retrieveQuiz(to.params.quizId);
      }
    });
  }

  public retrieveQuiz(quizId) {
    this.quizService()
      .find(quizId)
      .then(res => {
        this.quiz = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
