import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import config from '~/config';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import styles from './Register.module.scss';
import { AuthContext } from '~/contexts/AuthContext';
import { isEmail } from '~/helper';
import { LOCAL_STORAGE_TOKEN_NAME } from '~/contexts/Constans';

const cx = classNames.bind(styles);

function Register() {
    const { registerUser } = useContext(AuthContext);
    const [registerForm, setRegisterForm] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
        verifyPassword: '',
    });
    const [errorRegisterForm, setErrorRegisterForm] = useState({
        fullName: '',
        email: '',
        userName: '',
        password: '',
        verifyPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            nav('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRegister = async () => {
        if (!validateFrom()) {
            return;
        }
        setIsLoading(true);
        const response = await registerUser(registerForm);
        setIsLoading(false);
        if (response.success) {
            nav('/');
        } else {
            setErrorRegisterForm((prev) => ({
                ...prev,
                [response.type]: response.message,
            }));
            alert('Register fail');
        }
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

    const validateFrom = () => {
        let isSubmittable = true;
        const valuesKeys = Object.keys(registerForm);
        valuesKeys.forEach((key) => {
            if (registerForm[key] === '') {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    [key]: 'Required',
                }));
                isSubmittable = false;
            }
        });
        if (!isEmail(registerForm.email) && registerForm.email) {
            setErrorRegisterForm((prev) => ({
                ...prev,
                email: 'Email is invalid',
            }));
            isSubmittable = false;
        } else if (isEmail(registerForm.email) && registerForm.email) {
            setErrorRegisterForm((prev) => ({
                ...prev,
                email: '',
            }));
        }
        if (registerForm.userName) {
            setErrorRegisterForm((prev) => ({
                ...prev,
                userName: '',
            }));
        }
        if (registerForm.fullName) {
            setErrorRegisterForm((prev) => ({
                ...prev,
                fullName: '',
            }));
        }
        if (registerForm.password || registerForm.verifyPassword) {
            if (registerForm.password && registerForm.password.length < 8) {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    password: 'Password length at least 8 characters',
                    verifyPassword: '',
                }));
                isSubmittable = false;
            } else if (
                registerForm.password &&
                registerForm.verifyPassword &&
                registerForm.password !== registerForm.verifyPassword
            ) {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    password: '',
                    verifyPassword: 'Password not match',
                }));
                isSubmittable = false;
            } else if (
                registerForm.password &&
                registerForm.verifyPassword &&
                registerForm.password === registerForm.verifyPassword
            ) {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    password: '',
                    verifyPassword: '',
                }));
            } else if (registerForm.password) {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    password: '',
                }));
                isSubmittable = false;
            } else {
                setErrorRegisterForm((prev) => ({
                    ...prev,
                    verifyPassword: '',
                }));
                isSubmittable = false;
            }
        }
        return isSubmittable;
    };
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Create your account</h3>
            <p className={cx('script')}>Please enter info to create account.</p>
            <TextInput
                className={cx('mb', 'input-control')}
                rounded
                leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                small
                name="email"
                value={registerForm.email}
                onChange={handleChange}
                placeholder="Enter your email"
                error={errorRegisterForm.email}
            />
            <TextInput
                rounded
                small
                className={cx('mb', 'input-control')}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                name="userName"
                value={registerForm.userName}
                onChange={handleChange}
                placeholder="Enter your username"
                error={errorRegisterForm.userName}
            />
            <TextInput
                rounded
                small
                className={cx('mb', 'input-control')}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
                name="fullName"
                value={registerForm.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errorRegisterForm.fullName}
            />

            <TextInput
                className={cx('mb', 'input-control')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                name="password"
                value={registerForm.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                error={errorRegisterForm.password}
            />
            <TextInput
                className={cx('mb', 'input-control')}
                rounded
                small
                leftIcon={<FontAwesomeIcon icon={faKey} />}
                name="verifyPassword"
                value={registerForm.verifyPassword}
                onChange={handleChange}
                placeholder="Verify your password"
                type="password"
                error={errorRegisterForm.verifyPassword}
            />

            <Button
                className={cx('register-btn')}
                rounded
                outline
                small
                onClick={handleRegister}
                isLoading={isLoading}
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
