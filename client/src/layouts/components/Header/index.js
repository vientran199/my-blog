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
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import NavMenus from './NavMenus';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

const MENU = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/about-us',
        title: 'About us',
    },
    {
        path: '/contact',
        title: 'Contact',
    },
];
function Header() {
    const { authState, logoutUser } = useContext(AuthContext);
    const currentUser = authState.user;

    const nav = useNavigate();
    const handleLogout = () => {
        logoutUser();
        nav('/');
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
                                to={'/write'}
                                outline
                                className={cx('add-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            >
                                Viết bài
                            </Button>
                            <Link to={config.routes.profile}>
                                <img
                                    className={cx('avatar')}
                                    src={images.noImage}
                                    alt={'avatar'}
                                />
                            </Link>
                            <Button to={config.routes.profile} text>
                                Tran Van Vien
                            </Button>
                            <button
                                className={cx('action-btn', 'log-out')}
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                />
                            </button>
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
