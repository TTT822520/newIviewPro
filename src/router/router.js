import Main from '@/view/main'
import parentView from '@/components/parent-view';
/**
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  access: (null) 可访问该页面的权限值，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * 没有下级的 不需要填写  meta   有下级的  填写meta
 * }
 */
export default [{
    path: '/login',
    name: 'login',
    meta: {
        title: '用户登录',
        hideInMenu: true
    },
    component: () =>
        import ('@/view/login/login.vue')
}, {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
        hideInMenu: true,
    },
    children: [{
        path: '/home',
        name: 'home',
        meta: {
            hideInMenu: false,
            title: '首页',
        },
        component: () =>
            import ('@/view/home/home')
    }]
}, {
    path: '/test',
    name: 'test',
    meta: {
        title: '测试',
        //   href: 'https://lison16.github.io/iview-admin-doc/#/',
        icon: 'ios-book'
    },
    component: Main,
    children: [{
        path: '/count_to_page',
        name: 'count_to_page',
        meta: {
            icon: 'md-trending-up',
            title: '测试子级'
        },
        component: parentView,
        children: [{
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
                icon: 'md-funnel',
                title: '三级'
            },
            component: () =>
                import ('@/view/login/login')
        }]
    }]
}, {
    path: '/test2',
    name: 'test2',
    component: Main,
    children: [{
        path: '/test2page',
        name: 'QQ群子集',
        meta: {
            icon: 'qq',
            title: 'QQ群',
            access: "4"
        },
        component: () =>
            import ('@/view/test.vue')
    }]
}]