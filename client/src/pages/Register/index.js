import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import config from '~/config';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import styles from './Register.module.scss';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Register() {
    const { registerUser } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        fullName: '',
        email: '',
        password: '',
        verifyPassword: '',
    });

    const nav = useNavigate();
    const handleRegister = async () => {
        await registerUser(registerForm);
        nav('/');
    };

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setRegisterForm((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Create your account</h3>
            <p className={cx('script')}>Please enter info to create account.</p>
            <TextInput
                rounded
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                small
                name="email"
                value={registerForm.email}
                onChange={handleChange}
                className={cx('mb')}
                placeholder="Enter your email"
                // error={'Loi'}
            />
            <TextInput
                rounded
                small
                className={cx('mb')}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                name="fullName"
                value={registerForm.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                // error={'Loi'}
            />

            <TextInput
                className={cx('mb')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                name="password"
                value={registerForm.password}
                onChange={handleChange}
                placeholder="Enter your password"
            />
            <TextInput
                className={cx('mb')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                name="verifyPassword"
                value={registerForm.verifyPassword}
                onChange={handleChange}
                placeholder="Verify your password"
            />

            <Button
                className={cx('register-btn')}
                rounded
                outline
                small
                onClick={handleRegister}
            >
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
