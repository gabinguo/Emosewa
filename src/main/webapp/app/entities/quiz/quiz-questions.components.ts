import Component from 'vue-class-component';
import { Inject, Vue, Watch } from 'vue-property-decorator';
import QuizService from '@/entities/quiz/quiz.service';
import QuestionService from '@/entities/question/question.service';
import { IQuestion } from '@/shared/model/question.model';
import { IQuiz } from '@/shared/model/quiz.model';
import { IOption } from '@/shared/model/option.model';
import Axios from 'axios';
import { resolve } from 'url';
import './loading.scss';
const baseApiUrl = 'api/options';

@Component
export default class QuizQuestions extends Vue {
  public currentQuestion: IQuestion = {};
  public acceptingAnswers = false;
  public score = 0;
  public questionCounter = 0;
  public quiz: IQuiz = {};
  public indexQuestion = 0;
  public optionChoosed = 0;
  public classToApply = '';

  @Inject('quizService') private quizService: () => QuizService;

  public chooseOption(dataNumber): void {}

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

  public choose(target): void {
    var answerIndex = -1;
    switch (this.quiz.questions[this.indexQuestion].answer) {
      case 'A':
        answerIndex = 0;
        break;
      case 'B':
        answerIndex = 1;
        break;
      case 'C':
        answerIndex = 2;
        break;
      case 'D':
        answerIndex = 3;
        break;
      case 'E':
        answerIndex = 4;
        break;
    }

    this.classToApply = target.dataset['number'] == answerIndex ? 'correct' : 'incorrect';

    target.parentElement.classList.add(this.classToApply);

    setTimeout(() => {
      target.parentElement.classList.remove(this.classToApply);

      if (target.dataset['number'] == answerIndex) {
        console.log('data-number(option choosed): ' + target.dataset['number']);
        console.log('answerIndex: ' + answerIndex);
        // Check if it's the last question
        if (this.indexQuestion + 1 == this.quiz.questions.length) {
          // End function : page display TBD
          this.score += 10;
          alert('Final score: ' + this.score);
        } else {
          // If answer is correct
          this.indexQuestion += 1;
          this.score += 10;
        }
      } else {
        console.log('data-number(option choosed): ' + target.dataset['number']);
        console.log('answerIndex: ' + answerIndex);
        // Check if it's the last question
        if (this.indexQuestion + 1 == this.quiz.questions.length) {
          // End function : page display TBD
          alert('Final score: ' + this.score);
        } else {
          // If answer is incorrect
          this.indexQuestion += 1;
        }
      }
    }, 1000);
  }

  data() {
    return {
      imgName: 'logo-jhipster.png',
      img1: '../../../content/images/logo-jhipster.png',
    }
  }

}
