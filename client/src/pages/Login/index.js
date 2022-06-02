import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import config from '~/config';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import styles from './Login.module.scss';

import { FacebookIcon, GoogleIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Wellcome back</h3>
            <p className={cx('script')}>
                Sign in to get the most out of Myblog.
            </p>
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                small
                className={cx('mb')}
                placeholder="Enter your email"
                // error={'Loi'}
            />

            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                small
                placeholder="Enter your password"
            />

            <div className={cx('option')}>
                <div className={cx('remember-me')}>
                    <input type="checkbox" />
                    <label>Remember me</label>
                </div>
                <Button
                    to={config.routes.resetPasword}
                    className={cx('forgot-password')}
                    text
                >
                    Forgot password?
                </Button>
            </div>
            <Button className={cx('login-btn')} rounded outline small>
                Login
            </Button>

            <div className={cx('dive')}>or</div>
            <Button
                className={cx('login-btn', 'mb')}
                rounded
                outline
                small
                leftIcon={<FacebookIcon />}
            >
                Login with Facebook
            </Button>
            <Button
                className={cx('login-btn', 'mb')}
                rounded
                outline
                small
                leftIcon={<GoogleIcon />}
            >
                Login with Google
            </Button>

            <div className={cx('register-link')}>
                <span>Don't have a account?</span>
                <Button
                    to={config.routes.register}
                    className={cx('forgot-password')}
                    text
                >
                    Register now
                </Button>
            </div>
        </div>
    );
}

export default Login;
