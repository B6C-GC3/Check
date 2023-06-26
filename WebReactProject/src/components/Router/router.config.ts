import LoadableComponent from './../Loadable/index';

export const adminRouters: any = [
  //#region none display
  {
    path: "/admin",
    exact: true,
    component: LoadableComponent(
      () => import("../../components/Layout/AdminLayout")
    ),
    isLayout: true,
  },
  {
    path: "/admin/dashboard",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Dashboard"))
  },
  {
    path: "/admin/supplier",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/SupplierInfo"))
  },
  {
    path: "/admin/setting-menu",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/MenuSetting"))
  },
  {
    path: "/admin/phan-he",
    exact: false,
    component: LoadableComponent(() => import("../../scenes/OAuthAreas/Permission/TenantAdministrator"))
  },
  {
    path: "/admin/role-internal",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/OAuthAreas/Permission/RoleInternal"))
  },
  {
    path: "/admin/attribute-value",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/ProductAtributeValue"))
  },
  {
    path: "/admin/product-attribute",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/ProductAtribute"))
  },
  {
    path: "/admin/supplier-attribute-product",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/SupplierAttributeProduct"))
  },
  {
    path: "/admin/adress",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Adress"))
  },
  {
    path: "/admin/product",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Product"))
  },
  {
    path: "/admin/category/cai-dat",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Category"))
  },
  {
    path: "/admin/category/cai-dat/:id/:name",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/AdminAreas/Category"))
  },
  {
    path: '/admin',
    exact: true,
    component: LoadableComponent(() => import('../../scenes/AdminAreas/Dashboard'))
  }
  //#endregion
];
export const supplierRouters: any = [
  {
    path: "/supplier",
    exact: true,
    component: LoadableComponent(
      () => import("../../components/Layout/SupplierLayout")
    ),
    isLayout: true,
  },
  {
    path: "/supplier/category/cai-dat",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Category"))
  },
  {
    path: "/supplier/category/cai-dat/:id/:name",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Category"))
  },
  {
    path: "/supplier/info",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/InfomationStore"))
  },
  {
    path: "/supplier/staff",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Staff"))
  },
  {
    path: "/supplier/product",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Product"))
  },
  {
    path: "/supplier/add-product",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/ProductAdd"))
  },
  {
    path: "/supplier/bank-card",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/BankCard"))
  },
  {
    path: "/supplier/product-comment",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/CommentProduct"))
  },
  {
    path: "/supplier/product-edit",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/EditProduct"))
  },
  {
    path: "/supplier",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Dashboard"))
  }
];
export const userRouter: any = [
  {
    path: '/user',
    exact: true,
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/UserLayout')),
    isLayout: true,
    showInMenu: false,
    index: 0
  }, {
    path: '/user/checkout',
    name: 'Người dùng',
    title: 'User',
    component: LoadableComponent(() => import('../../scenes/UserAreas/CheckoutProduct')),
    showInMenu: false,
    index: 0
  }, {
    path: '/user/cart',
    name: 'Người dùng',
    title: 'User',
    component: LoadableComponent(() => import('../../scenes/UserAreas/CartProduct')),
    showInMenu: false,
    index: 0
  }, {
    path: '/user',
    name: 'Người dùng',
    title: 'User',
    component: LoadableComponent(() => import('../../scenes/UserAreas/Dashboard')),
    showInMenu: false,
    index: 0
  },
];
export const appRouter: any = [
  {
    path: '/',
    exact: true,
    name: 'user',
    title: 'User',
    component: LoadableComponent(() => import('../../components/Layout/AppLayout')),
    isLayout: true,
    showInMenu: false,
    index: 0
  }, {
    path: "/s/register",
    exact: true,
    component: LoadableComponent(() => import("../../scenes/SupplierAreas/Register"))
  }, {
    path: '/products',
    name: 'products',
    title: 'Danh sách',
    component: LoadableComponent(() => import('../../scenes/AppAreas/HCategoryListProduct')),
    showInMenu: false,
    index: 0
  }, {
    path: '/detail',
    name: 'detail',
    title: 'Chi tiết sản phẩm',
    component: LoadableComponent(() => import('../../scenes/AppAreas/DetailProduct')),
    showInMenu: false,
    index: 0
  }, {
    path: '/login',
    name: 'login',
    title: 'Đăng Nhập',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/token',
    name: 'Token',
    title: 'Xác thực',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/change-password',
    name: 'change password',
    title: 'Thay đổi mật khẩu',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/forgot-password',
    name: 'forgotPassword',
    title: 'Lấy lại mật khẩu',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/signup',
    name: 'Signup',
    title: 'Đăng Ký',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/Logout',
    name: 'Logout',
    title: 'Đăng Xuất',
    component: LoadableComponent(() => import('../../scenes/OAuthAreas/UserLogin')),
    showInMenu: false,
    index: 0
  }, {
    path: '/supplie-registration',
    name: 'SupplierRegistration',
    title: 'Đăng ký nhà cung cấp',
    component: LoadableComponent(() => import('../../scenes/AppAreas/SupplierRegistration')),
    showInMenu: false,
    index: 0
  },
  {
    path: '/shop',
    name: 'shop',
    title: 'shop',
    component: LoadableComponent(() => import('../../scenes/AppAreas/ShopSupplier')),
    showInMenu: false,
    index: 0
  }, {
    path: '/',
    name: 'Home',
    title: 'Trang chủ',
    component: LoadableComponent(() => import('../../scenes/AppAreas/Home')),
    showInMenu: false,
    index: 0
  }
];

export const routers = [...adminRouters, ...supplierRouters, ...userRouter, ...appRouter];
