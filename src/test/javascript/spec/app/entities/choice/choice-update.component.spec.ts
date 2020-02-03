/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ChoiceUpdateComponent from '@/entities/choice/choice-update.vue';
import ChoiceClass from '@/entities/choice/choice-update.component';
import ChoiceService from '@/entities/choice/choice.service';

import QuestionService from '@/entities/question/question.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Choice Management Update Component', () => {
    let wrapper: Wrapper<ChoiceClass>;
    let comp: ChoiceClass;
    let choiceServiceStub: SinonStubbedInstance<ChoiceService>;

    beforeEach(() => {
      choiceServiceStub = sinon.createStubInstance<ChoiceService>(ChoiceService);

      wrapper = shallowMount<ChoiceClass>(ChoiceUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          choiceService: () => choiceServiceStub,

          questionService: () => new QuestionService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.choice = entity;
        choiceServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(choiceServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.choice = entity;
        choiceServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(choiceServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
