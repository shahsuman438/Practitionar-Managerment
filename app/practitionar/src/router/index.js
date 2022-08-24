import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Admin from "../pages/admin/Admin.vue";
import Practitionar from "../pages/admin/Practitionar.vue";
import PractitionarCreate from "../pages/admin/PractitionarCreate.vue";
import PractitionarEdit from "../pages/admin/PractitionarEdit.vue";
import pageNotFound from "../components/pageNotFound.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      isAuth: false,
    },
    children: [
      {
        path: "practitionar",
        name: "Practitionar",
        component: Practitionar,
      },
      {
        path: "practitionar/create",
        name: "PractitionarCreate",
        component: PractitionarCreate,
      },
      {
        path: "practitionar/:id/edit",
        name: "PractitionarEdit",
        component: PractitionarEdit,
        props: true,
      },
    ],
  },
  { path: "/:pathMatch(.*)*", name: "pageNotFound", component: pageNotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    next("/");
  } else {
    next();
  }
});

export default router;
