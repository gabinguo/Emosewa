/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import ReportUpdateComponent from '@/entities/report/report-update.vue';
import ReportClass from '@/entities/report/report-update.component';
import ReportService from '@/entities/report/report.service';

import UserService from '@/admin/user-management/user-management.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('Report Management Update Component', () => {
    let wrapper: Wrapper<ReportClass>;
    let comp: ReportClass;
    let reportServiceStub: SinonStubbedInstance<ReportService>;

    beforeEach(() => {
      reportServiceStub = sinon.createStubInstance<ReportService>(ReportService);

      wrapper = shallowMount<ReportClass>(ReportUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          reportService: () => reportServiceStub,

          userService: () => new UserService()
        }
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.report = entity;
        reportServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reportServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.report = entity;
        reportServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(reportServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
