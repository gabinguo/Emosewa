import Vue from 'vue';
import Component from 'vue-class-component';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import LoginForm from '@/account/login-form/login-form.vue';

@Component({
  components: {
    'jhi-navbar': JhiNavbar,
    'login-form': LoginForm,

    'jhi-footer': JhiFooter
  }
})
export default class App extends Vue {
  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }
}
