import Header from '../components/Header';
import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
import { Wrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function AuthLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Wrapper>
                    <div className={cx('content')}>{children}</div>
                </Wrapper>
            </div>
        </div>
    );
}

export default AuthLayout;
