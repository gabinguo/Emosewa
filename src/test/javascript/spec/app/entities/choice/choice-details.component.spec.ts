/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ChoiceDetailComponent from '@/entities/choice/choice-details.vue';
import ChoiceClass from '@/entities/choice/choice-details.component';
import ChoiceService from '@/entities/choice/choice.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Choice Management Detail Component', () => {
    let wrapper: Wrapper<ChoiceClass>;
    let comp: ChoiceClass;
    let choiceServiceStub: SinonStubbedInstance<ChoiceService>;

    beforeEach(() => {
      choiceServiceStub = sinon.createStubInstance<ChoiceService>(ChoiceService);

      wrapper = shallowMount<ChoiceClass>(ChoiceDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { choiceService: () => choiceServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundChoice = { id: 123 };
        choiceServiceStub.find.resolves(foundChoice);

        // WHEN
        comp.retrieveChoice(123);
        await comp.$nextTick();

        // THEN
        expect(comp.choice).toBe(foundChoice);
      });
    });
  });
});
