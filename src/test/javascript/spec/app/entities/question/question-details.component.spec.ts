/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import QuestionDetailComponent from '@/entities/question/question-details.vue';
import QuestionClass from '@/entities/question/question-details.component';
import QuestionService from '@/entities/question/question.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Question Management Detail Component', () => {
    let wrapper: Wrapper<QuestionClass>;
    let comp: QuestionClass;
    let questionServiceStub: SinonStubbedInstance<QuestionService>;

    beforeEach(() => {
      questionServiceStub = sinon.createStubInstance<QuestionService>(QuestionService);

      wrapper = shallowMount<QuestionClass>(QuestionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { questionService: () => questionServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuestion = { id: 123 };
        questionServiceStub.find.resolves(foundQuestion);

        // WHEN
        comp.retrieveQuestion(123);
        await comp.$nextTick();

        // THEN
        expect(comp.question).toBe(foundQuestion);
      });
    });
  });
});
