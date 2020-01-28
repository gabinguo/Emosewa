/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import QuestionTypeUpdateComponent from '@/entities/question-type/question-type-update.vue';
import QuestionTypeClass from '@/entities/question-type/question-type-update.component';
import QuestionTypeService from '@/entities/question-type/question-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('QuestionType Management Update Component', () => {
    let wrapper: Wrapper<QuestionTypeClass>;
    let comp: QuestionTypeClass;
    let questionTypeServiceStub: SinonStubbedInstance<QuestionTypeService>;

    beforeEach(() => {
      questionTypeServiceStub = sinon.createStubInstance<QuestionTypeService>(QuestionTypeService);

      wrapper = shallowMount<QuestionTypeClass>(QuestionTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          questionTypeService: () => questionTypeServiceStub
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.questionType = entity;
        questionTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.questionType = entity;
        questionTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(questionTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
