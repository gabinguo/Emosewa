import Component from 'vue-class-component';
import { Inject, Vue, Watch } from 'vue-property-decorator';
import QuizService from '@/entities/quiz/quiz.service';
import QuestionService from '@/entities/question/question.service';
import { IQuestion } from '@/shared/model/question.model';
import { IQuiz } from '@/shared/model/quiz.model';
import { IOption } from '@/shared/model/option.model';
import Axios from 'axios';
import { resolve } from 'url';

const baseApiUrl = 'api/options';

@Component
export default class QuizQuestions extends Vue {
  public currentQuestion: IQuestion = {};
  public acceptingAnswers = false;
  public score = 0;
  public questionCounter = 0;
  public quiz: IQuiz = {};
  public indexQuestion = 0;

  @Inject('quizService') private quizService: () => QuizService;

  public chooseOption(): void {}

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

  public mounted(): void {}
}
