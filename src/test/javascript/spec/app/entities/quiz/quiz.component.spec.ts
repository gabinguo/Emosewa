/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import QuizComponent from '@/entities/quiz/quiz.vue';
import QuizClass from '@/entities/quiz/quiz.component';
import QuizService from '@/entities/quiz/quiz.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Quiz Management Component', () => {
    let wrapper: Wrapper<QuizClass>;
    let comp: QuizClass;
    let quizServiceStub: SinonStubbedInstance<QuizService>;

    beforeEach(() => {
      quizServiceStub = sinon.createStubInstance<QuizService>(QuizService);
      quizServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<QuizClass>(QuizComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          quizService: () => quizServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      quizServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllQuizs();
      await comp.$nextTick();

      // THEN
      expect(quizServiceStub.retrieve.called).toBeTruthy();
      expect(comp.quizzes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      quizServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeQuiz();
      await comp.$nextTick();

      // THEN
      expect(quizServiceStub.delete.called).toBeTruthy();
      expect(quizServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
