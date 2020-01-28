/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import QuizTypeComponent from '@/entities/quiz-type/quiz-type.vue';
import QuizTypeClass from '@/entities/quiz-type/quiz-type.component';
import QuizTypeService from '@/entities/quiz-type/quiz-type.service';

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
  describe('QuizType Management Component', () => {
    let wrapper: Wrapper<QuizTypeClass>;
    let comp: QuizTypeClass;
    let quizTypeServiceStub: SinonStubbedInstance<QuizTypeService>;

    beforeEach(() => {
      quizTypeServiceStub = sinon.createStubInstance<QuizTypeService>(QuizTypeService);
      quizTypeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<QuizTypeClass>(QuizTypeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          quizTypeService: () => quizTypeServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      quizTypeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllQuizTypes();
      await comp.$nextTick();

      // THEN
      expect(quizTypeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.quizTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      quizTypeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeQuizType();
      await comp.$nextTick();

      // THEN
      expect(quizTypeServiceStub.delete.called).toBeTruthy();
      expect(quizTypeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
