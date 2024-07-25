import DashboardPage from "../views/dashboard/Dashboard";
import UserList from "../views/User/List/UserList.container";
import CustomerList from "../views/Customers/List/CustomerList.container";
import AppSettings from "../views/AppSettings/AppSettings.container";
import IndustryList from "../views/Industry/IndustryList.container";
import MilestoneList from "../views/Milestone/List/MilestoneList";
import CategoryList from "../views/Category/CategoryList.container";
import RoleList from "../views/Role/List/RoleList";

import RoleCreate from "../views/Role/Create/RoleCreate";
import BadgeList from "../views/Badge/List/BadgeList.container";
import ProductList from "../views/Products/List/ProductList.container";
// import UpperTabs from "../views/User/components/UpperTabs/UpperTabs.view";
import BlogsList from "../views/Blogs/BlogsList.container";
import FaqList from "../views/Faq/FaqList.container";
import UpdatedFaqList from "../views/NewFaq/FaqList.container";
import SupportList from "../views/Support/SupportList.container";
import TypeList from "../views/Type/TypeList.container";
import Profile from "../views/Profile/MyProfile.view";

import CustomerTabs from "../views/Customers/components/UpperTabs/CustomerTabs.view";
import ManufacturerTabs from "../views/Manufacturer/ManufacturerTabs.view";
import Support from "../views/Support/Support.view";
import UnitList from "../views/Unit/UnitList.container";
import SubCategoryList from "../views/SubCategory/SubCategoryList.container";
import QuoteList from "../views/Quotes/QuoteList.container";
import QuoteDetail from "../views/Quotes/Quote.view";
import HubMasterList from "../views/HubMaster/List/HubMasterList";
import BlogsComponentList from "../views/Blogs/BlogsList/BlogsList.container";
import ProductDetailview from "../views/Details/ProductDetails.view";
import UnitsList from "../views/Units/UnitList.container";
import NotificationDetails from "../components/NotificationCard/NotificationDetails";
import ContactList from "../views/Contact/ContactList.container";
import ContactCreate from "../views/Contact/Create/ContactCreate";
import {
  Dashboard,
  MeetingRoom,
  SupervisedUserCircle,
  Person,
  LibraryBooks,
  VerifiedUser,
  LocalOffer,
  BubbleChart,
  EventNote,
  ContactSupport,
  Settings,
  FormatShapes,
  AccountBox,
  Layers,
  AdminPanelSettings,
  Contacts,
  CalendarMonth,
  Book,
  SupportAgent,
  ReceiptLong,
  People,
  LiveHelp,
  ManageAccounts,
  ContentPaste,
} from "@mui/icons-material";
import RouteName from "./Route.name";
import TaskDetailView from "../views/Profile/TaskDetail/TaskDetailView";
import ServiceListContainer from "../views/Service/List/ServiceListContainer";
import ServiceDetailView from "../views/Service/Detail/ServiceDetailView";
import StyleGuide from "../views/StyleGuide/StyleGuide";
import UserCreate from "../views/User/Create/UserCreate";
import ProductCreate from "../views/Products/Create/ProductCreate";
import React, { lazy } from "react";
import CalendarList from "../views/Calendar/CalendarList.view";
import BlogsCreate from "../views/Blogs/BlogsCreate/BlogCreate";
import NewBlogsCreate from "../views/Blogs/BlogsNewcreate/BlogsNewCreate";
import RoleDetail from "../views/Role/RoleDetail/RoleDetail";
import CustomFiled from "../views/CustomFiled/CustomFiled";
import ServiceGroupCreate from "../views/ServiceGroup/ServiceGroupCreate/ServiceGroupCreate.view";
import InvoiceCreate from "../views/WhatsappInvoice/InvoiceCreate/InvoiceCreate.view";
import AdminUserCreate from "../views/User/AdminUserCreate/AdminUserCreate.view";

const CustomerAcquisition = lazy(() => import('../views/CustomerAcquisition/List/CustomerAcquisition')); 
const Source = lazy(() => import('../views/Source/List/Source')); 

 
const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    is_sidebar: true,
  },
  {
    path: "/styleguide",
    sidebarName: "Style Guide",
    icon: FormatShapes,
    component: StyleGuide,
    is_sidebar: true,
  },
  {
    path: `${RouteName.LOGIN_PROFILE}`,
    sidebarName: "My Profile",
    // navbarName: "My Profile",
    icon: AccountBox,
    component: Profile,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.PROFILE}`,
    // sidebarName: "My Profile",
    // navbarName: "My Profile",
    // icon: AccountBox,
    component: Profile,
    // is_sidebar: false,
    is_protect: true,
     parentRoute:`${RouteName.ADMIN_USER}`,
  },
  {
    path: `${RouteName.NOTIFICATION_DETAILS}`,
    // sidebarName: "My Profile",
    // navbarName: "My Profile",
    // icon: Person,
    component: NotificationDetails,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.TASK_DETAIL}:id`,
    sidebarName: "My Profile",
    navbarName: "My Profile",
    icon: Person,
    component: TaskDetailView,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: "null",
    sidebarName: "Masters",
    navbarName: "Masters",
    icon: Layers,
    is_sidebar: true,
    slug: "masters",
    is_parent: true,
  },
  {
    path: "null",
    sidebarName: "Admin Users",
    // navbarName: "Admin Users",
    icon: AdminPanelSettings,
    is_sidebar: true,
    slug: "admin",
    is_parent: true,
  },
  // {
  //   path: "/industry",
  //   sidebarName: "Industries",
  //   navbarName: "Industries",
  //   icon: MeetingRoom,
  //   component: IndustryList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   should_regex: true,
  //   parent: "masters",
  // },
  // {
  //   path: "/master/milestone",
  //   sidebarName: "Master Milestone",
  //   navbarName: "Master Milestone",
  //   icon: MeetingRoom,
  //   component: MilestoneList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   should_regex: true,
  //   parent: "masters",
  // },

  {
    path: "/industry/category/:id",
    sidebarName: "Categories",
    navbarName: "Categories",
    icon: Dashboard,
    component: CategoryList,
    is_sidebar: false,
    is_protect: true,
    should_regex: true,
    // parent: 'masters',
  },
  {
    path: "/industry/category/subcategory/:id",
    sidebarName: "SubCategory",
    navbarName: "SubCategory",
    icon: Dashboard,
    component: SubCategoryList,
    is_sidebar: false,
    is_protect: true,
    // parent: 'masters',
  },
  {
    path: RouteName.ADMIN_USER,
    sidebarName: "Staff List",
    // navbarName: "Staff List",
    icon: People,
    component: UserList,
    is_sidebar: true,
    is_protect: true,
    parent: "staff_manage",
  },
  {
    path: RouteName.ADMIN_USER_CREATE,
    parentRoute:`${RouteName.ADMIN_USER}`,
    component: AdminUserCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.ADMIN_USER_UPDATE}:id`,
    parentRoute:`${RouteName.ADMIN_USER}`,
    component: AdminUserCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.USER_UPDATE_MY_PROFILE}:id`,
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: SupervisedUserCircle,
    component: UserCreate,
    is_sidebar: false,
    is_protect: true,
    parent: "admin",
   
  },
  // {
  //   path: `${RouteName.USER_PROFILE}:id`,
  //   sidebarName: "Users",
  //   navbarName: "Users",
  //   icon: Dashboard,
  //   component: UpperTabs,
  //   is_sidebar: false,
  //   is_protect: true,
  //   should_regex:false
  // },
  // {
  //   path: `${RouteName.USER_PROFILE_CREATE}`,
  //   sidebarName: "Users",
  //   navbarName: "Users",
  //   icon: Dashboard,
  //   component: UpperTabs,
  //   is_sidebar: false,
  //   is_protect: true,
  //   should_regex:false
  // },

  {
    path: RouteName.ROLE,
    sidebarName: "User Role",
    // navbarName: "User Role",
    icon: ManageAccounts,
    component: RoleList,
    is_sidebar: true,
    is_protect: true,
    parent: "admin",
    
  },
  {
    path: RouteName.ROLE_CREATE,
    component: RoleCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.ROLE}`
  },
  {
    path: `${RouteName.ROLE_CREATE_UPDATE}:id`,
    should_regex:false,
    component: RoleCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.ROLE}`
  },
  {
    path: `${RouteName.ROLE_DETAIL}:id`,
    should_regex: false,
    component: RoleDetail,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.ROLE}`
  },
  // {
  //   path: "/badge",
  //   sidebarName: "Badge",
  //   navbarName: "Badge",
  //   icon: VerifiedUser,
  //   component: BadgeList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   parent: "masters",
  // },
  // {
  //   path: "/badge",
  //   sidebarName: "Badge",
  //   navbarName: "Badge",
  //   icon: VerifiedUser,
  //   component: BadgeList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   parent: "masters",
  // },
  {
    path: RouteName.PRODUCT,
    sidebarName: "Products",
    // navbarName: "Products",
    icon: AccountBox,
    component: ServiceGroupCreate,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  {
    path: `${RouteName.PRODUCT_DETAILS}:id`,
    sidebarName: "Products",
    navbarName: "Products",
    icon: LocalOffer,
    component: ProductDetailview,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.PRODUCT}`
  },
  {
    path: `${RouteName.PRODUCT_UPDATE}:id`,
    sidebarName: "Products",
    //navbarName: "Products",
    icon: LocalOffer,
    component: ProductCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.PRODUCT}`
  },
  {
    path: `${RouteName.PRODUCT_CREATE}`,
    sidebarName: "Products",
    //navbarName: "Products",
    icon: LocalOffer,
    component: ProductCreate,
    is_sidebar: false,
    is_protect: true,
    parentRoute:`${RouteName.PRODUCT}`
  },
  {
    path: `${RouteName.APP_USERS}`,
    sidebarName: "App Users",
    // navbarName: "App Users",
    icon: SupervisedUserCircle,
    component: CustomerList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.CONTACT_LIST}`,
    sidebarName: "Contact",
    // navbarName: "Contact",
    icon: Contacts,
    component: ContactList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.CONTACT_CREATE}`,
    sidebarName: "Contact",
    //navbarName: "Contact",
    icon: SupervisedUserCircle,
    component: ContactCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: `${RouteName.CALENDAR}`,
    sidebarName: "Calendar",
    // navbarName: "Calendar",
    icon: CalendarMonth,
    component: CalendarList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: `${RouteName.CUSTOMERS_MANUFACTURES}:id`,
    sidebarName: "Manufacturer",
    navbarName: "Manufacturer",
    icon: SupervisedUserCircle,
    component: ManufacturerTabs,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: `${RouteName.CUSTOMERS_CUSTOMER}:id`,
    sidebarName: "Customers",
    navbarName: "Customers",
    icon: SupervisedUserCircle,
    component: CustomerTabs,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: "/blogs",
    sidebarName: "Blogs",
    // navbarName: "Blogs",
    icon: Book,
    component: BlogsComponentList,
    is_sidebar: true,
    is_parent: false,
  },
  {
    path: "/faq",
    sidebarName: "FAQ",
    // navbarName: "FAQ",
    icon: LiveHelp,
    component: UpdatedFaqList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  // {
  //   path: "/new/faq",
  //   sidebarName: "New FAQ",
  //   navbarName: "New FAQ",
  //   icon: BubbleChart,
  //   component: UpdatedFaqList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   parent: "masters",
  // },
  {
    path: "/support",
    sidebarName: "Customer Support",
    // navbarName: "Customer Support",
    icon: SupportAgent,
    component: SupportList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: "/support/detail/:id",
    sidebarName: "Support Detail",
    navbarName: "Support Detail",
    icon: SupervisedUserCircle,
    component: Support,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  // {
  //   path: "/type",
  //   sidebarName: "Type",
  //   navbarName: "Type",
  //   icon: VerifiedUser,
  //   component: TypeList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   parent: "masters",
  // },
  {
    path: "/unit",
    sidebarName: "Unit",
    // navbarName: "Unit",
    icon: ContentPaste,
    component: UnitsList,
    is_sidebar: true,
    is_protect: true,
    parent: "masters",
  },
  // {
  //   path: RouteName.HUB_MASTERS,
  //   sidebarName: "Hub Master",
  //   navbarName: "Hub Master",
  //   icon: EventNote,
  //   component: HubMasterList,
  //   is_sidebar: true,
  //   is_protect: true,
  //   // should_regex: false,
  //   parent: "masters",
  // },

  {
    path: "/app/settings",
    sidebarName: "App Settings",
    // navbarName: "App Settings",
    icon: Settings,
    component: AppSettings,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: "/quotes",
    sidebarName: "Quotes",
    // navbarName: "Quotes",
    icon: ReceiptLong,
    component: QuoteList,
    is_sidebar: true,
    is_protect: true,
    should_regex: true,
  },
  {
    path: "/quotes/detail/:id",
    sidebarName: "Quotes Detail",
    navbarName: "Quotes Detail",
    icon: SupervisedUserCircle,
    component: QuoteDetail,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: "null",
    sidebarName: "Staff Management",
    // navbarName: "Staff Management",
    icon: AdminPanelSettings,
    is_sidebar: true,
    slug: "staff_manage",
    is_parent: true,
  },
  {
    path: RouteName.CUSTOM_FILED,
    sidebarName: "Custom Filed",
    navbarName: "Custom Filed",
    icon: SupervisedUserCircle,
    component: CustomFiled,
    is_sidebar: false,
    is_protect: true,

  },

  // {
  //   path:"/service/list/" ,
  //   sidebarName: "Service",
  //   navbarName: "Service",
  //   icon: EventNote,

  //   component:ServiceListContainer ,
  //   is_sidebar: true,
  //   is_protect: true,
  //   // should_regex: false,
  //   parent: "masters",
  // },
  {
    path: RouteName.SERVICE_DETAIL,
    sidebarName: "Service list",
    // navbarName: "service List",
    icon: SupervisedUserCircle,
    component: ServiceDetailView,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: `${RouteName?.BLOGS_CREATE}`,
    component: NewBlogsCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
 
  {
    path: `${RouteName?.WHATSAPP_INVOICE}`,
    component: InvoiceCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: `${RouteName?.BLOGS_UPDATE}:id`,
    component: NewBlogsCreate,
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
  },
  {
    path: `${RouteName?.CUSTOMERS_ACQUISITION}`,
    sidebarName: "Customers Acquisition",
    navbarName: "Customers Acquisition",
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
    component:CustomerAcquisition
  },
  {
    path: `${RouteName?.SOURCE}`,
    sidebarName: "Source",
    navbarName: "Source",
    is_sidebar: false,
    is_protect: true,
    should_regex: false,
    component:Source
  },
];

export default dashboardRoutes;
