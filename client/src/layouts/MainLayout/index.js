import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';

import Header from '../components/Header';

const cx = classNames.bind(styles);

function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default MainLayout;
