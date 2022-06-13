import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import { InboxIcon, MessageIcon } from '~/components/Icon';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faEarthAsia,
    faUser,
    faGear,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import NavMenus from './NavMenus';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU = [
    {
        path: config.routes.home,
        title: 'Home',
    },
    {
        path: config.routes.aboutUs,
        title: 'About us',
    },
    {
        path: config.routes.contact,
        title: 'Contact',
    },
];

const MENU_OPTION = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        to: config.routes.profile,
        title: 'Profile',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        to: '#',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log out',
        type: 'logout',
        separate: true,
    },
];

function Header() {
    const { authState, logoutUser } = useContext(AuthContext);
    const currentUser = authState.isAuthenticated;

    const nav = useNavigate();
    const handleLogout = () => {
        logoutUser();
        nav('/');
    };

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break;
            case 'logout':
                handleLogout();
                break;
            default:
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home}>
                    <img
                        className={cx('logo')}
                        src={images.logo}
                        alt={'logo'}
                    />
                </Link>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Search />
                            <Tippy
                                delay={[0, 100]}
                                placement="bottom"
                                content="Inbox"
                            >
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                            <Tippy
                                delay={[0, 100]}
                                placement="bottom"
                                content="Message"
                            >
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Button
                                to={config.routes.write}
                                outline
                                className={cx('add-btn')}
                                leftIcon={
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                }
                            >
                                Viết bài
                            </Button>

                            <Menu
                                items={MENU_OPTION}
                                user={authState.user.fullName}
                                hideOnClick={true}
                                onChange={handleMenuChange}
                            >
                                <img
                                    className={cx('avatar')}
                                    src={
                                        authState.user.profile.image
                                            ? `http://localhost:5000/${authState.user.profile.image
                                                  .slice(11)
                                                  .replace('\\', '/')}`
                                            : images.noImage
                                    }
                                    alt={'avatar'}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button
                                to={config.routes.login}
                                rounded
                                outline
                                small
                            >
                                Log in
                            </Button>
                            <Button
                                to={config.routes.register}
                                rounded
                                outline
                                small
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <NavMenus menus={MENU} />
        </header>
    );
}

export default Header;
