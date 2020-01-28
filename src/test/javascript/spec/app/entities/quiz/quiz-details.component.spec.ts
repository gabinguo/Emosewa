/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import QuizDetailComponent from '@/entities/quiz/quiz-details.vue';
import QuizClass from '@/entities/quiz/quiz-details.component';
import QuizService from '@/entities/quiz/quiz.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Quiz Management Detail Component', () => {
    let wrapper: Wrapper<QuizClass>;
    let comp: QuizClass;
    let quizServiceStub: SinonStubbedInstance<QuizService>;

    beforeEach(() => {
      quizServiceStub = sinon.createStubInstance<QuizService>(QuizService);

      wrapper = shallowMount<QuizClass>(QuizDetailComponent, { store, i18n, localVue, provide: { quizService: () => quizServiceStub } });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuiz = { id: 123 };
        quizServiceStub.find.resolves(foundQuiz);

        // WHEN
        comp.retrieveQuiz(123);
        await comp.$nextTick();

        // THEN
        expect(comp.quiz).toBe(foundQuiz);
      });
    });
  });
});
