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
    component: '../pages/home',
    name: 'ToDo',
    icon: 'home',
  },
  {
    path: '/setting',
    component: '../pages/setting',
    name: 'Setting',
    icon: 'setting',
  },
];

export default routes;
