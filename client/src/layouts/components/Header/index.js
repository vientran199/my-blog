// import {
//     faBell,
//     faMagnifyingGlass,
//     faMessage,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import { InboxIcon, MessageIcon, SearchIcon } from '~/components/Icon';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
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
                            <Tippy
                                delay={[0, 100]}
                                placement="bottom"
                                content="Search"
                            >
                                <button className={cx('action-btn')}>
                                    <SearchIcon />
                                </button>
                            </Tippy>
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
                            <Link to={'/profile'}>
                                <img
                                    className={cx('avatar')}
                                    src={images.noImage}
                                    alt={'avatar'}
                                />
                            </Link>
                            <Link to={'/profile'} className={cx('name')}>
                                Tran Van Vien
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button rounded outline>
                                Log in
                            </Button>
                            <Button rounded outline>
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
