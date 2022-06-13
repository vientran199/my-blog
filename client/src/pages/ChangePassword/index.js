import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { AuthContext } from '~/contexts/AuthContext';
import { isEmail } from '~/helper';
import styles from './ChangePassword.module.scss';

const cx = classNames.bind(styles);

function ResetPassword() {
    const { changePassword } = useContext(AuthContext);
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        verifyPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        verifyPassword: '',
    });

    const validate = (name, value) => {
        if (name === 'email') {
            setErrorMessage((prev) => ({
                ...prev,
                email: !value
                    ? 'Required'
                    : isEmail(value)
                    ? ''
                    : 'Email is invalid',
            }));
        }
        if (name === 'oldPassword') {
            setErrorMessage((prev) => ({
                ...prev,
                [name]: value ? '' : 'Required',
            }));
        }
        if (name === 'newPassword') {
            setErrorMessage((prev) => ({
                ...prev,
                [name]: value ? '' : 'Required',
            }));
        }
        if (name === 'verifyPassword') {
            if (value && value !== formData.newPassword) {
                setErrorMessage((prev) => ({
                    ...prev,
                    [name]: 'Password not match',
                }));
            } else {
                setErrorMessage((prev) => ({
                    ...prev,
                    [name]: value ? '' : 'Required',
                }));
            }
        }
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        validate(name, value);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await changePassword(formData);
            if (response.success) {
                alert(response.message);
                nav('/login');
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
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
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                className={cx('mb', 'input-control')}
                placeholder="Enter your email"
                error={errorMessage.email}
            />
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                small
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={(e) => handleChange(e)}
                className={cx('mb', 'input-control')}
                placeholder="Enter your old password"
                error={errorMessage.oldPassword}
            />
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                small
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleChange(e)}
                className={cx('mb', 'input-control')}
                placeholder="Enter your password"
                error={errorMessage.newPassword}
            />
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                small
                name="verifyPassword"
                type="password"
                value={formData.verifyPassword}
                onChange={(e) => handleChange(e)}
                className={cx('mb', 'input-control')}
                placeholder="Enter your password again"
                error={errorMessage.verifyPassword}
            />

            <Button
                className={cx('send-btn')}
                rounded
                outline
                small
                onClick={handleSubmit}
            >
                Send
            </Button>
        </div>
    );
}

export default ResetPassword;
