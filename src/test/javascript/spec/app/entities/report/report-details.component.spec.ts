/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import ReportDetailComponent from '@/entities/report/report-details.vue';
import ReportClass from '@/entities/report/report-details.component';
import ReportService from '@/entities/report/report.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Report Management Detail Component', () => {
    let wrapper: Wrapper<ReportClass>;
    let comp: ReportClass;
    let reportServiceStub: SinonStubbedInstance<ReportService>;

    beforeEach(() => {
      reportServiceStub = sinon.createStubInstance<ReportService>(ReportService);

      wrapper = shallowMount<ReportClass>(ReportDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { reportService: () => reportServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundReport = { id: 123 };
        reportServiceStub.find.resolves(foundReport);

        // WHEN
        comp.retrieveReport(123);
        await comp.$nextTick();

        // THEN
        expect(comp.report).toBe(foundReport);
      });
    });
  });
});
