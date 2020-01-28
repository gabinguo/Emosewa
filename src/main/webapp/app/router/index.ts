import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';
const Home = () => import('../core/home/home.vue');
const Error = () => import('../core/error/error.vue');
const Register = () => import('../account/register/register.vue');
const Activate = () => import('../account/activate/activate.vue');
const ResetPasswordInit = () => import('../account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../account/change-password/change-password.vue');
const Settings = () => import('../account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../admin/docs/docs.vue');
const JhiHealthComponent = () => import('../admin/health/health.vue');
const JhiLogsComponent = () => import('../admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const Question = () => import('../entities/question/question.vue');
// prettier-ignore
const QuestionUpdate = () => import('../entities/question/question-update.vue');
// prettier-ignore
const QuestionDetails = () => import('../entities/question/question-details.vue');
// prettier-ignore
const Quiz = () => import('../entities/quiz/quiz.vue');
// prettier-ignore
const QuizUpdate = () => import('../entities/quiz/quiz-update.vue');
// prettier-ignore
const QuizDetails = () => import('../entities/quiz/quiz-details.vue');
// prettier-ignore
const Report = () => import('../entities/report/report.vue');
// prettier-ignore
const ReportUpdate = () => import('../entities/report/report-update.vue');
// prettier-ignore
const ReportDetails = () => import('../entities/report/report-details.vue');
// prettier-ignore
const Player = () => import('../entities/player/player.vue');
// prettier-ignore
const PlayerUpdate = () => import('../entities/player/player-update.vue');
// prettier-ignore
const PlayerDetails = () => import('../entities/player/player-details.vue');
// prettier-ignore
const Option = () => import('../entities/option/option.vue');
// prettier-ignore
const OptionUpdate = () => import('../entities/option/option-update.vue');
// prettier-ignore
const OptionDetails = () => import('../entities/option/option-details.vue');
// prettier-ignore
const QuizType = () => import('../entities/quiz-type/quiz-type.vue');
// prettier-ignore
const QuizTypeUpdate = () => import('../entities/quiz-type/quiz-type-update.vue');
// prettier-ignore
const QuizTypeDetails = () => import('../entities/quiz-type/quiz-type-details.vue');
// prettier-ignore
const QuestionType = () => import('../entities/question-type/question-type.vue');
// prettier-ignore
const QuestionTypeUpdate = () => import('../entities/question-type/question-type-update.vue');
// prettier-ignore
const QuestionTypeDetails = () => import('../entities/question-type/question-type-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    }
    ,
    {
      path: '/question',
      name: 'Question',
      component: Question,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question/new',
      name: 'QuestionCreate',
      component: QuestionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question/:questionId/edit',
      name: 'QuestionEdit',
      component: QuestionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question/:questionId/view',
      name: 'QuestionView',
      component: QuestionDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/quiz',
      name: 'Quiz',
      component: Quiz,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz/new',
      name: 'QuizCreate',
      component: QuizUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz/:quizId/edit',
      name: 'QuizEdit',
      component: QuizUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz/:quizId/view',
      name: 'QuizView',
      component: QuizDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/report/new',
      name: 'ReportCreate',
      component: ReportUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/report/:reportId/edit',
      name: 'ReportEdit',
      component: ReportUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/report/:reportId/view',
      name: 'ReportView',
      component: ReportDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/player',
      name: 'Player',
      component: Player,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/player/new',
      name: 'PlayerCreate',
      component: PlayerUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/player/:playerId/edit',
      name: 'PlayerEdit',
      component: PlayerUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/player/:playerId/view',
      name: 'PlayerView',
      component: PlayerDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/option',
      name: 'Option',
      component: Option,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/option/new',
      name: 'OptionCreate',
      component: OptionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/option/:optionId/edit',
      name: 'OptionEdit',
      component: OptionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/option/:optionId/view',
      name: 'OptionView',
      component: OptionDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/quiz-type',
      name: 'QuizType',
      component: QuizType,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz-type/new',
      name: 'QuizTypeCreate',
      component: QuizTypeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz-type/:quizTypeId/edit',
      name: 'QuizTypeEdit',
      component: QuizTypeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/quiz-type/:quizTypeId/view',
      name: 'QuizTypeView',
      component: QuizTypeDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/question-type',
      name: 'QuestionType',
      component: QuestionType,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question-type/new',
      name: 'QuestionTypeCreate',
      component: QuestionTypeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question-type/:questionTypeId/edit',
      name: 'QuestionTypeEdit',
      component: QuestionTypeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/question-type/:questionTypeId/view',
      name: 'QuestionTypeView',
      component: QuestionTypeDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
