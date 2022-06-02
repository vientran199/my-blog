import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import { InboxIcon, MessageIcon } from '~/components/Icon';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import NavMenus from './NavMenus';

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
    const currentUser = true;

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
            {currentUser && <NavMenus menus={MENU} />}
        </header>
    );
}

export default Header;
