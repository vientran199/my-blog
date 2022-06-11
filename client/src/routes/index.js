import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import ResetPassword from '~/pages/ResetPassword';

import MainLayout, { AuthLayout } from '~/layouts';
import AboutUs from '~/pages/AboutUs';
import Contact from '~/pages/Contact';
import Write from '~/pages/Write';
import Profile from '~/pages/Profile';
import ProfileLayout from '~/layouts/ProfileLayout';
import Saved from '~/pages/Saved';
import DetailPost from '~/pages/DetailPost';


const publicRoutes = [
    { path: config.routes.home, component: Home, layout: MainLayout },
    { path: config.routes.aboutUs, component: AboutUs, layout: MainLayout },
    { path: config.routes.contact, component: Contact, layout: MainLayout },
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
    {
        path: config.routes.resetPasword,
        component: ResetPassword,
        layout: AuthLayout,
    },
    {
        path: config.routes.detailPost,
        component: DetailPost,
        layout: MainLayout,
    },
];

const privateRoutes = [
    { path: config.routes.write, component: Write, layout: MainLayout },
    { path: config.routes.editPost, component: Write, layout: MainLayout },
    { path: config.routes.profile, component: Profile, layout: ProfileLayout },
    { path: config.routes.saved, component: Saved, layout: ProfileLayout },
];

export { publicRoutes, privateRoutes };
