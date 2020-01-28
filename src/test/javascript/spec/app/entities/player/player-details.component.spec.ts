/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import PlayerDetailComponent from '@/entities/player/player-details.vue';
import PlayerClass from '@/entities/player/player-details.component';
import PlayerService from '@/entities/player/player.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Player Management Detail Component', () => {
    let wrapper: Wrapper<PlayerClass>;
    let comp: PlayerClass;
    let playerServiceStub: SinonStubbedInstance<PlayerService>;

    beforeEach(() => {
      playerServiceStub = sinon.createStubInstance<PlayerService>(PlayerService);

      wrapper = shallowMount<PlayerClass>(PlayerDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { playerService: () => playerServiceStub }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundPlayer = { id: 123 };
        playerServiceStub.find.resolves(foundPlayer);

        // WHEN
        comp.retrievePlayer(123);
        await comp.$nextTick();

        // THEN
        expect(comp.player).toBe(foundPlayer);
      });
    });
  });
});
