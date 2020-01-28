/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import OptionDetailComponent from '@/entities/option/option-details.vue';
import OptionClass from '@/entities/option/option-details.component';
import OptionService from '@/entities/option/option.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Option Management Detail Component', () => {
    let wrapper: Wrapper<OptionClass>;
    let comp: OptionClass;
    let optionServiceStub: SinonStubbedInstance<OptionService>;

    beforeEach(() => {
      optionServiceStub = sinon.createStubInstance<OptionService>(OptionService);

      wrapper = shallowMount<OptionClass>(OptionDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { optionService: () => optionServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundOption = { id: 123 };
        optionServiceStub.find.resolves(foundOption);

        // WHEN
        comp.retrieveOption(123);
        await comp.$nextTick();

        // THEN
        expect(comp.option).toBe(foundOption);
      });
    });
  });
});
