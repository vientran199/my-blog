import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import MainLayout, { AuthLayout } from '~/layouts';
// import { Fragment } from 'react';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: MainLayout },
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
