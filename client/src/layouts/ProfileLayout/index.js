import classNames from "classnames/bind";
import styles from './ProfileLayout.module.scss'
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import User from "./User";
import SubMenu from "./SubMenu";
import { useEffect } from "react";

const cx = classNames.bind(styles)

function ProfileLayout({ children }) {
    const username = useLocation().pathname.split('/')[1] || '';

    useEffect(() => {

    }, [username])
    return <div className={cx('wrapper')}>
        <Header />
        <div className={cx('container')}>
            <User />
            <div className={cx('content')}>
                <SubMenu />
                <div className={cx('body')}>{children}</div>
            </div>
        </div>
    </div>;
}

export default ProfileLayout;