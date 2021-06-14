const routes: (
  | { path: string; redirect: string }
  | { path: string; component: string; name: string; icon: string }
  | { path: string; component: string }
)[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: '@/pages/home',
  },
  {
    path: '/done',
    component: '@/pages/done',
  },
  {
    path: '/setting',
    component: '@/pages/setting',
  },
];

export default routes;
