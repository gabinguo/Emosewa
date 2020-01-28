/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import QuestionTypeDetailComponent from '@/entities/question-type/question-type-details.vue';
import QuestionTypeClass from '@/entities/question-type/question-type-details.component';
import QuestionTypeService from '@/entities/question-type/question-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('QuestionType Management Detail Component', () => {
    let wrapper: Wrapper<QuestionTypeClass>;
    let comp: QuestionTypeClass;
    let questionTypeServiceStub: SinonStubbedInstance<QuestionTypeService>;

    beforeEach(() => {
      questionTypeServiceStub = sinon.createStubInstance<QuestionTypeService>(QuestionTypeService);

      wrapper = shallowMount<QuestionTypeClass>(QuestionTypeDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { questionTypeService: () => questionTypeServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundQuestionType = { id: 123 };
        questionTypeServiceStub.find.resolves(foundQuestionType);

        // WHEN
        comp.retrieveQuestionType(123);
        await comp.$nextTick();

        // THEN
        expect(comp.questionType).toBe(foundQuestionType);
      });
    });
  });
});
