import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuizType } from '@/shared/model/quiz-type.model';
import QuizTypeService from './quiz-type.service';

@Component
export default class QuizTypeDetails extends Vue {
  @Inject('quizTypeService') private quizTypeService: () => QuizTypeService;
  public quizType: IQuizType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.quizTypeId) {
        vm.retrieveQuizType(to.params.quizTypeId);
      }
    });
  }

  public retrieveQuizType(quizTypeId) {
    this.quizTypeService()
      .find(quizTypeId)
      .then(res => {
        this.quizType = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
