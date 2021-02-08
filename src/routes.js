import { lazy } from 'react';

// pages
const HomePage = lazy(() => import('pages/HomeTemp'));
const ListUser = lazy(() => import('pages/User/ListUser'));
const FormUser = lazy(() => import('pages/User/FormUser'));
const ListGroup = lazy(() => import('pages/Group/ListGroup'));
const FormGroup = lazy(() => import('pages/Group/FormGroup'));
const ListRequestDraft = lazy(() =>
  import('pages/RequestDraft/ListRequestDraft')
);
const ReportDraft = lazy(() => import('pages/Report/Draft'));
const RequestDetail = lazy(() => import('pages/RequestDraft/RequestDetail'));
const CreateRequestFlow = lazy(() =>
  import('pages/RequestFlow/CreateRequestFlow')
);
const Formlist = lazy(() => import('pages/Application/Formlist'));
const TestForm = lazy(() => import('pages/TestForm'));
const Status = lazy(() => import('pages/Application/Status'));

// Admin
const ListCustomFormAdmin = lazy(() =>
  import('pages/Admin/CustomForm/ListCustomForm')
);
const AddCustomFormAdmin = lazy(() =>
  import('pages/Admin/CustomForm/AddCustomForm')
);
const UpdateCustomFormAdmin = lazy(() =>
  import('pages/Admin/CustomForm/UpdateCustomForm')
);
const FlowlistAdmin = lazy(() => import('pages/Admin/Flowlist'));
const Report = lazy(() => import('pages/Admin/Report'));

// Other page
const Signin = lazy(() => import('pages/Authentication/Signin'));
const Signup = lazy(() => import('pages/Authentication/Signup'));
const PasswordReset = lazy(() => import('pages/Authentication/PasswordReset'));
const ChangePassword = lazy(() =>
  import('pages/Authentication/ChangePassword')
);

// note route
//  - permistion: 1 => Chỉ những user có role == 1 mới vào được <> không vào được
//  - tab: "1,2" => Để xác định menu sidebar thuộc tab nào
//  - type: "hide" => Ẩn menu này trên sidebar, "external" => Hiển thị trên sidebar, "submenu" => Có menu con (children)
//  - component: => Component của route tương ứng, Nếu type == submenu thì không có component (sẽ auto vào 404)
//  - protected: true => Đã login mới vào được  <> redirect routing 404

// constant
var indexRoutes = [
  // router tab 1
  {
    path: '/',
    name: 'Home',
    tab: 1,
    type: 'hide',
    component: HomePage,
    protected: true
  },
  {
    path: '/applicationformlist',
    name: '申請フォーム一覧',
    tab: 1,
    type: 'external',
    component: Formlist,
    protected: true
  },
  {
    path: '/testform',
    name: 'Test form',
    tab: 1,
    type: 'hide',
    component: TestForm,
    protected: true
  },
  {
    path: '/request-draft',
    name: '下書き (2)',
    tab: 1,
    type: 'external',
    component: ListRequestDraft,
    protected: true
  },
  {
    path: '/applicationstatus',
    name: '申請状況',
    tab: 1,
    type: 'submenu',
    // component: nó là route cha nên không có component,
    protected: true,
    children: [
      {
        path: '/empty1',
        name: '承認待ち',
        tab: 1,
        type: 'show',
        component: ListRequestDraft,
        protected: true
      },
      {
        path: '/empty2',
        name: '承認済み',
        tab: 1,
        type: 'show',
        component: Status,
        protected: true
      }
    ]
  },
  {
    path: '/approvalstatus',
    name: '承認状況',
    tab: 1,
    type: 'submenu',
    // component: nó là route cha nên không có component,
    protected: true,
    children: [
      {
        path: '/empty3',
        name: '未処理',
        tab: 1,
        type: 'show',
        component: Status,
        protected: true
      },
      {
        path: '/empty4',
        name: '処理済み',
        tab: 1,
        type: 'show',
        component: Status,
        protected: true
      }
    ]
  },

  // router tab 2
  {
    path: '/applicationformmanagement',
    name: '申請フォーム管理',
    tab: 2,
    type: 'external',
    component: HomePage,
    permistion: 1,
    protected: true
  },
  {
    path: '/groups',
    name: '承認グループ情報',
    tab: 2,
    type: 'external',
    component: ListGroup,
    permistion: 1,
    protected: true
  },
  {
    path: '/users',
    name: 'ユーザ情報',
    tab: 2,
    type: 'external',
    component: ListUser,
    permistion: 1,
    protected: true
  },
  {
    path: '/report',
    name: '報告',
    tab: 2,
    type: 'external',
    component: Report,
    permistion: 1,
    protected: true
  },
  {
    path: '/report/draft',
    name: '報告',
    tab: 2,
    type: 'external',
    component: ReportDraft,
    protected: true
  },
  {
    path: '/admin/customform',
    name: 'フォーム一覧',
    tab: 2,
    type: 'external',
    component: ListCustomFormAdmin,
    permistion: 1,
    protected: true
  },
  {
    name: 'フォーム一覧',
    tab: 2,
    type: 'external',
    path: '/admin/customform/addform',
    component: AddCustomFormAdmin,
    protected: true
  },
  {
    name: 'Update form',
    tab: 2,
    type: 'hide',
    path: '/admin/customform/updateform/:formID',
    component: UpdateCustomFormAdmin,
    protected: true
  },
  {
    path: '/admin/flow',
    name: 'フロー',
    tab: 2,
    type: 'hide',
    component: FlowlistAdmin,
    permistion: 1,
    protected: true
  },
  {
    path: `/users/addnew`,
    name: 'Addnew User',
    component: FormUser,
    type: 'hide',
    protected: true
  },
  {
    path: `/users/update/:user_id`,
    name: 'Update User.',
    component: FormUser,
    protected: true,
    type: 'hide',
    permistion: 1
  },
  {
    path: `/groups/addnew`,
    name: 'Addnew User.',
    component: FormGroup,
    type: 'hide',
    protected: true
  },
  {
    path: `/groups/update/:group_id`,
    name: 'Update User.',
    component: FormGroup,
    protected: true,
    type: 'hide',
    permistion: 1
  },
  {
    path: `/request-detail/:request_id`,
    name: '下書き.',
    component: RequestDetail,
    type: 'hide',
    protected: true
  },
  {
    path: `/create-request-flow`,
    name: 'Create Request Flow.',
    component: CreateRequestFlow,
    type: 'hide',
    protected: true
  },
  {
    path: '/authentication',
    name: 'authentication',
    type: 'hide',
    tab: 1,
    children: [
      {
        path: '/signin',
        name: 'Signin',
        component: Signin
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup
      },
      {
        path: '/forgot',
        name: 'Forgot',
        component: PasswordReset
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: ChangePassword
      }
    ]
  }
];

export default indexRoutes;
