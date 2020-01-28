/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import PlayerComponent from '@/entities/player/player.vue';
import PlayerClass from '@/entities/player/player.component';
import PlayerService from '@/entities/player/player.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-alert', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {}
  }
};

describe('Component Tests', () => {
  describe('Player Management Component', () => {
    let wrapper: Wrapper<PlayerClass>;
    let comp: PlayerClass;
    let playerServiceStub: SinonStubbedInstance<PlayerService>;

    beforeEach(() => {
      playerServiceStub = sinon.createStubInstance<PlayerService>(PlayerService);
      playerServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<PlayerClass>(PlayerComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          alertService: () => new AlertService(store),
          playerService: () => playerServiceStub
        }
      });
      comp = wrapper.vm;
    });

    it('should be a Vue instance', () => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });

    it('Should call load all on init', async () => {
      // GIVEN
      playerServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllPlayers();
      await comp.$nextTick();

      // THEN
      expect(playerServiceStub.retrieve.called).toBeTruthy();
      expect(comp.players[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      playerServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removePlayer();
      await comp.$nextTick();

      // THEN
      expect(playerServiceStub.delete.called).toBeTruthy();
      expect(playerServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
