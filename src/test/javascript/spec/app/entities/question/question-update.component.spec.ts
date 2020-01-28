/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import QuestionUpdateComponent from '@/entities/question/question-update.vue';
import QuestionClass from '@/entities/question/question-update.component';
import QuestionService from '@/entities/question/question.service';

import QuestionTypeService from '@/entities/question-type/question-type.service';

import OptionService from '@/entities/option/option.service';

import QuizService from '@/entities/quiz/quiz.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Question Management Update Component', () => {
    let wrapper: Wrapper<QuestionClass>;
    let comp: QuestionClass;
    let questionServiceStub: SinonStubbedInstance<QuestionService>;

    beforeEach(() => {
      questionServiceStub = sinon.createStubInstance<QuestionService>(QuestionService);

      wrapper = shallowMount<QuestionClass>(QuestionUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          questionService: () => questionServiceStub,

          questionTypeService: () => new QuestionTypeService(),

          optionService: () => new OptionService(),

          quizService: () => new QuizService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.question = entity;
        questionServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.question = entity;
        questionServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
