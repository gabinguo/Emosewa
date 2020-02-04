import Component from 'vue-class-component';
import { Inject, Vue, Watch } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import LoginForm from '@/account/login-form/login-form.vue';
import AccountService from '@/account/account.service';
import QuizService from '@/entities/quiz/quiz.service';
import { IQuiz } from '@/shared/model/quiz.model';
import { watch } from 'fs';

@Component
export default class Home extends Vue {
  @Inject('quizService') private quizService: () => QuizService;
  public quizzes: IQuiz[] = [];
  public isFetching = false;
  public perPage = 9;
  public pages = [];
  public page = 1;
  public emptyBtnNum = 0;
  //public isFirstTime = true;

  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('accountService') private accountService: () => AccountService;

  @Watch('quizzes')
  public setPages() {
    let numberOfPages = Math.ceil(this.quizzes.length / this.perPage);
    for (let index = 1; index <= numberOfPages; index++) {
      this.pages.push(index);
    }
  }

  @Watch('page')
  public modifyEmptyBtnNum() {
    if (this.page * this.perPage - this.quizzes.length < 0) {
      this.emptyBtnNum = 0;
    } else {
      this.emptyBtnNum = this.page * this.perPage - this.quizzes.length;
    }
  }

  public paginate(quizzes): IQuiz[] {
    let page = this.page;
    let perPage = this.perPage;
    let from = page * perPage - perPage;
    let to = page * perPage;
    return quizzes.slice(from, to);
  }

  public displayedQuizzes(): IQuiz[] {
   this. modifyEmptyBtnNum();
  //  if(this.isFirstTime){
  //    this.retrieveAllQuizs();
  //   this.isFirstTime = false;
  //  }
    return this.paginate(this.quizzes);
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public hasAnyAuthority(authorities: any): boolean {
    return this.accountService().hasAnyAuthority(authorities);
  }

  public get username(): string {
    return this.$store.getters.account ? this.$store.getters.account.login : '';
  }

  public mounted(): void {
    this.retrieveAllQuizs();
  }

  public clear(): void {
    this.retrieveAllQuizs();
  }

  public retrieveAllQuizs(): void {
    this.isFetching = true;

    this.quizService()
      .retrieve()
      .then(
        res => {
          this.quizzes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }
}
