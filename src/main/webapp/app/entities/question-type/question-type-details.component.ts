import { Component, Vue, Inject } from 'vue-property-decorator';

import { IQuestionType } from '@/shared/model/question-type.model';
import QuestionTypeService from './question-type.service';

@Component
export default class QuestionTypeDetails extends Vue {
  @Inject('questionTypeService') private questionTypeService: () => QuestionTypeService;
  public questionType: IQuestionType = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.questionTypeId) {
        vm.retrieveQuestionType(to.params.questionTypeId);
      }
    });
  }

  public retrieveQuestionType(questionTypeId) {
    this.questionTypeService()
      .find(questionTypeId)
      .then(res => {
        this.questionType = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
