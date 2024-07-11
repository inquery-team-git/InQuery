// import NewReleasesIcon from '@mui/icons-material/NewReleases';
// import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import PreviewIcon from '@mui/icons-material/Preview';

export const profileRoutes = [
  // {
  //   id: 'profile',
  //   path: '/profile',
  //   name: 'User Profile',
  //   layout: '/admin/settings',
  // },
  // {
  //   id: 'email',
  //   path: '/email',
  //   name: 'Email Preferences',
  //   layout: '/admin/settings',
  // },
];

export const companyRoutes = [
  {
    id: 'home',
    path: '/cluster',
    name: 'Home',
    layout: '/admin',
    icon: <DashboardIcon />,
  },
  // {
  //   id: 'sqlEditor',
  //   path: '/sql-editor',
  //   name: 'SQL Editor',
  //   layout: '/admin',
  //   icon: <CodeIcon />,
  // },
  {
    id: 'queryHistory',
    path: '/query-history',
    name: 'Query History',
    layout: '/admin',
    icon: <HistoryOutlinedIcon />,
  },
  // {
  //   id: 'plugins',
  //   path: '/plugins',
  //   name: 'Plugins',
  //   layout: '/admin',
  //   icon: <PowerIcon />
  // },
  // {
  //   id: 'company',
  //   path: '/company',
  //   name: 'Company',
  //   layout: '/admin/settings',
  //   icon: <PowerIcon />
  // },
  // {
  //   id: 'team',
  //   path: '/team',
  //   name: 'Access Control',
  //   layout: '/admin/settings',
  //   icon: <VerifiedUserIcon />
  // },
  // {
  //   id: 'custom-domain',
  //   path: '/custom-domain',
  //   name: 'Custom Domain',
  //   layout: '/admin/settings',
  // },
  // {
  //   id: 'user-emails',
  //   path: '/user-emails',
  //   name: 'User Emails',
  //   layout: '/admin/settings',
  // },
  // {
  //   id: 'billing',
  //   path: '/billing',
  //   name: 'Plans & Billing',
  //   layout: '/admin/settings',
  // },
];

export const changeLogRoutes = [
  {
    id: 'labels',
    path: '/labels',
    name: 'Labels',
    layout: '/admin/settings/changelog',
  },
  {
    id: 'privacy',
    path: '/privacy',
    name: 'Privacy',
    layout: '/admin/settings/changelog',
  },
];

export const adminNavBarRoutes = {
  left: [],
  right: [
    // {
    //   id: 'changelog',
    //   path: '/changelog',
    //   name: 'Show Preview',
    //   layout: '',
    //   icon: <PreviewIcon />,
    // },
    // {
    //   id: 'changelog',
    //   path: '/changelog',
    //   name: `What's New`,
    //   layout: '',
    //   icon: <NewReleasesIcon />,
    // },
    // {
    //   id: 'notifications',
    //   path: '/notifications',
    //   name: `Notifications`,
    //   layout: '',
    //   icon: <NotificationsActiveIcon />,
    // },
  ],
};

export const standardNavbarRoutes = {
  left: [
    {
      id: 'share-updates',
      path: '/share-updates',
      name: 'Share Updates',
      layout: '',
    },
    {
      id: 'pricing',
      path: '/pricing',
      name: 'Pricing',
      layout: '',
    },
    {
      id: 'blog',
      path: '/blog',
      name: 'Blog',
      layout: '',
    },
    {
      id: 'docs',
      path: '/docs',
      name: 'Docs',
      layout: '',
    },
  ],
  right: [
    {
      id: 'login',
      path: '/login',
      name: 'Login',
      layout: '',
    },
    {
      id: 'signup',
      path: '/sign-up',
      name: 'Signup',
      layout: '',
    },
  ],
};

export const publicNavBarRoutes = {
  left: [
    {
      id: 'changelog',
      path: '/changelog',
      name: 'Changelog',
      layout: '',
    },
  ],
  right: [
    {
      id: 'notfications',
      path: '#notfications',
      name: `Notifications`,
      layout: '',
      icon: <NotificationsActiveIcon />,
    },
  ],
};
