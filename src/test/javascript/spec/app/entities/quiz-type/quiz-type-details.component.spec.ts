/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import QuizTypeDetailComponent from '@/entities/quiz-type/quiz-type-details.vue';
import QuizTypeClass from '@/entities/quiz-type/quiz-type-details.component';
import QuizTypeService from '@/entities/quiz-type/quiz-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('QuizType Management Detail Component', () => {
    let wrapper: Wrapper<QuizTypeClass>;
    let comp: QuizTypeClass;
    let quizTypeServiceStub: SinonStubbedInstance<QuizTypeService>;

    beforeEach(() => {
      quizTypeServiceStub = sinon.createStubInstance<QuizTypeService>(QuizTypeService);

      wrapper = shallowMount<QuizTypeClass>(QuizTypeDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { quizTypeService: () => quizTypeServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuizType = { id: 123 };
        quizTypeServiceStub.find.resolves(foundQuizType);

        // WHEN
        comp.retrieveQuizType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.quizType).toBe(foundQuizType);
      });
    });
  });
});
