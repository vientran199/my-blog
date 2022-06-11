import classNames from "classnames/bind";
import styles from './ProfileLayout.module.scss'

import Header from "../components/Header";
import User from "./User";
import SubMenu from "./SubMenu";

const cx = classNames.bind(styles)

function ProfileLayout({ children }) {

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