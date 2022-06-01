import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import styles from './ResetPassword.module.scss';

const cx = classNames.bind(styles);

function ResetPassword() {
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Reset your password</h3>
            <p className={cx('script')}>
                The verification email will be sent to the mailbox. <br />
                Please check it.
            </p>
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                small
                className={cx('mb')}
                placeholder="Enter your email"
                // error={'Loi'}
            />

            <Button className={cx('send-btn')} rounded outline small>
                Send
            </Button>
        </div>
    );
}

export default ResetPassword;
