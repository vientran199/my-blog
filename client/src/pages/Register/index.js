import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import config from '~/config';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Create your account</h3>
            <p className={cx('script')}>Please enter info to create account.</p>
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                small
                className={cx('mb')}
                placeholder="Enter your email"
                // error={'Loi'}
            />
            <TextInput
                rounded
                small
                className={cx('mb')}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                placeholder="Enter your full name"
                // error={'Loi'}
            />

            <TextInput
                className={cx('mb')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                placeholder="Enter your password"
            />
            <TextInput
                className={cx('mb')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                placeholder="Verify your password"
            />

            <Button className={cx('register-btn')} rounded outline small>
                Register
            </Button>

            <div className={cx('dive')}>or</div>

            <Button
                className={cx('register-btn')}
                rounded
                outline
                small
                to={config.routes.login}
            >
                Login
            </Button>
        </div>
    );
}

export default Register;
