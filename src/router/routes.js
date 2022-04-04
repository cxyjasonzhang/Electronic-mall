
// 下面在用组件需要引入进来
export default [
    // 注册详情页的路由
    {
        // 当点击商品图片时，跳转到详情页，带上产品的id
        path: '/detail/:skuId',
        component: () => import("@/pages/Detail"),
        meta: {
            show: true
        }
    },
    {
        // Trade组件 在购物车页面中点击结算的时候跳转到Trade页面
        path: '/trade',
        component: () => import("@/pages/Trade"),
        meta: {
            show: true
        },
        // 路由独享守卫 当路由准备跳转到Trade组件之前 先判断路由是从哪来 如果是从shopcart来就放行，否则中断导航
        beforeEnter: (to, from, next) => {
            console.log(from);
            if (from.path == "/shopcart") {
                next();
            } else {
                // 中断当前导航
                next(false);
            }
        }
    },
    {
        // Center组件   多级组件
        path: '/center',
        component: () => import("@/pages/Center"),
        meta: { show: true },
        children: [
            {
                path: 'personorder',
                component: () => import("@/pages/Center/PersonOrder")
            },
            {
                path: 'grouporder',
                component: () => import("@/pages/Center/GroupOrder")
            },
            {
                // 重定向
                path: '/center',
                redirect: '/center/personorder'
            }
        ]
    },
    {
        // Pay组件 
        path: '/pay',
        component: () => import("@/pages/Pay"),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            console.log(from);
            if (from.path == "/trade") {
                next();
            } else {
                // 中断当前导航
                next(false);
            }
        }
    },
    {
        // PaySuccess组件  支付跳转
        path: '/paysuccess',
        component: () => import("@/pages/PaySuccess"),
        meta: {
            show: true
        },
        /* beforeEnter: (to, from, next) => {
            // console.log(from);
            // 如果你想去交易成功页面，必须是从支付页面而来
            if (from.path == "/pay") {
                next();
            } else {
                // 中断当前导航 从哪来回哪去
                // 如果不是从支付页面跳往支付成功页面，就停留在当前页面
                next(false);
            }
        } */
    },
    {
        path: '/home',
        // 路由懒加载
        component: () => import('@/pages/Home/Home'),
        meta: {
            show: true
        }
    },
    {
        //加入购物车跳转的路由
        name: "shopcart",
        path: '/shopcart',
        component: () => import("@/pages/ShopCart"),
        meta: {
            show: true
        }
    },
    {
        //购物车路由组件
        name: "addcartsuccess",
        path: '/addcartsuccess',
        component: () => import("@/pages/AddCartSuccess"),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: {
            show: false
        }
    },
    {
        name: 'search',
        // 这边占位params参数 加个？表示路由传参是params参数可以传也可不传 没加？会出现路径丢失的情况
        path: '/search/:keyword?',
        // path: '/search',
        component: () => import("@/pages/Search/Search"),
        meta: {
            show: true
        },
        // 路由组件传递props数据？
        // 01-布尔值写法 传递params的值
        // props: true
        // 02-对象写法---额外地给路由组件传递一些props
        /*  props: {
             a: 1,
             b: 2
         } */
        // 03--函数写法：可以将params参数、query参数，通过props传递给路由组件
        props: ($route) => ({
            a: $route.params.keyWord,
            b: $route.query.k
        })
    },
    {
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: {
            show: false
        }
    },
    // 重定向
    {
        path: '*',
        redirect: '/home'
    }
]