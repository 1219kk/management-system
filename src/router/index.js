import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // 用户管理
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  // 权限管理
  {
    path: '/form',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [

      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: 'power',
        name: 'Power',
        component: () => import('@/views/power/index'),
        meta: { title: '权限管理', icon: 'tree' }
      }
    ]
  },
  // 商品管理
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/shop1',
    name: 'Shop',
    meta: {
      title: '商品管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/shop/shop1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '商品列表' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/shop/shop2/index'),
        name: 'Menu2',
        meta: { title: '分类参数' }
      }, {
        path: 'menu3',
        component: () => import('@/views/shop/shop3/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '商品分类' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Order',
    // 总是展示， 用来处理菜单下只有一个展示子项的时候子项会替代父菜单的情况
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list/index'), // Parent router-view
        name: 'List',
        meta: { title: '订单列表' }
      }
    ]
  },
  // 数据统计
  {
    path: '/data',
    component: Layout,
    redirect: '/data/statistics',
    name: 'Data',
    // 总是展示， 用来处理菜单下只有一个展示子项的时候子项会替代父菜单的情况
    alwaysShow: true,
    meta: {
      title: '数据统计',
      icon: 'nested'
    },
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/statistics/index'), // Parent router-view
        name: 'List',
        meta: { title: '数据统计' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
