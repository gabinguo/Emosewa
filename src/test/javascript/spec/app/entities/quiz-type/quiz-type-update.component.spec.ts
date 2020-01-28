/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import QuizTypeUpdateComponent from '@/entities/quiz-type/quiz-type-update.vue';
import QuizTypeClass from '@/entities/quiz-type/quiz-type-update.component';
import QuizTypeService from '@/entities/quiz-type/quiz-type.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('QuizType Management Update Component', () => {
    let wrapper: Wrapper<QuizTypeClass>;
    let comp: QuizTypeClass;
    let quizTypeServiceStub: SinonStubbedInstance<QuizTypeService>;

    beforeEach(() => {
      quizTypeServiceStub = sinon.createStubInstance<QuizTypeService>(QuizTypeService);

      wrapper = shallowMount<QuizTypeClass>(QuizTypeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          quizTypeService: () => quizTypeServiceStub
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.quizType = entity;
        quizTypeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(quizTypeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.quizType = entity;
        quizTypeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(quizTypeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
