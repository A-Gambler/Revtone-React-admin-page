import React from 'react';

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/base/cards/Cards'));
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'));

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'));
const Switches = React.lazy(() => import('./views/base/switches/Switches'));

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const Charts = React.lazy(() => import('./views/charts/Charts'));

const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Password = React.lazy(() => import('./views/pages/password/ChangePassword'));
const Users = React.lazy(() => import('./views/pages/users/Users'));
const User = React.lazy(() => import('./views/pages/users/User'));
const DealsPromotions = React.lazy(() => import('./views/pages/deals/DealsPromotions'));
const AddPromotions = React.lazy(() => import('./views/pages/deals/AddPromotions'));
const PreviewPromotions = React.lazy(() => import('./views/pages/deals/PreviewPromotions'));
const StripePortal = React.lazy(() => import('./views/pages/stripe/StripePortal'));

const Reports = React.lazy(() => import('./views/pages/admin/report/report'));
const AdminPassword = React.lazy(() => import('./views/pages/admin/passoword/ChangePassword'));
const AdminUsers = React.lazy(() => import('./views/pages/admin/users/users'));
const BanUsers = React.lazy(() => import('./views/pages/admin/users/banUsers'));

const BusinessAccounts = React.lazy(() => import('./views/pages/admin/business/businessAccount'));
const AddBusinessAccounts = React.lazy(() => import('./views/pages/admin/business/addBusinessAccount'));
const ViewBusinessAccounts = React.lazy(() => import('./views/pages/admin/business/PreviewBusinessAccount'));

const ReportDetails = React.lazy(() => import('./views/pages/admin/report/reportDetail'));

const RevTones = React.lazy(() => import('./views/pages/admin/revtone/RevTones'));
const NewRevTone = React.lazy(() => import('./views/pages/admin/revtone/NewRevTones'));
const UpdateRevtone = React.lazy(() => import('./views/pages/admin/revtone/UpdateRevtone'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/deals', exact: true,  name: 'Deals and Promotions', component: DealsPromotions },
  { path: '/deals/add/', exact: true, name: 'Add Promotions', component: AddPromotions },
  { path: '/deals/preview/:id', exact: true, name: 'Preview Promotions', component: PreviewPromotions },
  { path: '/password', name: 'Change Password', component: Password },
  { path: '/stripe', name: 'Stripe Portal', component: StripePortal },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/admin', exact: true, name: 'Admin', component: Reports },
  { path: '/admin/reports', name: 'Reports', component: Reports},
  { path: '/admin/reportDetails/:id',exact: true, name: 'ReportDetails', component: ReportDetails},
  { path: '/admin/password', name: 'Password', component: AdminPassword},
  { path: '/admin/users', name: 'Users', component: AdminUsers},
  { path: '/admin/banUsers', name: 'BanUsers', component: BanUsers},
  { path: '/admin/business', exact: true, name: 'Bussiness Accounts', component: BusinessAccounts},
  { path: '/admin/business/add', name: 'Add Bussiness Accounts', component: AddBusinessAccounts},
  { path: '/admin/business/preview/:id',exact: true, name: 'View Bussiness Accounts', component: ViewBusinessAccounts},

  { path: '/admin/revtones/', name: 'RevTones', component: RevTones},
  { path: '/admin/newrevtone/', name: 'NewRevTone', component: NewRevTone},
  { path: '/admin/updateRevtone/:id',exact: true, name: 'updateRevtone', component: UpdateRevtone},



  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/forms', name: 'Forms', component: BasicForms },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];

export default routes;
