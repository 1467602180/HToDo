import { defineConfig } from 'umi';
import routes from './routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  layout: {},
  title: 'HToDo',
});
