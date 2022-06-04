import classNames from 'classnames/bind';

import styles from './Contact.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookSquare,
    faGithubSquare,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Contact() {
    return (
        <div className={cx('content')}>
            <div className={cx('heading')}>
                <h3 className={cx('heading-title')}>Contact us</h3>
                <p className={cx('description')}>
                    Any question or remarks? just write us a message
                </p>
            </div>
            <div className={cx('container')}>
                <div className={cx('contact-info')}>
                    <h4 className={cx('title')}>Contact Information</h4>
                    <div className={cx('detail')}>
                        <div className={cx('row')}>
                            <h5>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faPhone}
                                />
                                Call us
                            </h5>
                            <p>0971845946</p>
                        </div>
                        <div className={cx('row')}>
                            <h5>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faLocationDot}
                                />
                                Location
                            </h5>
                            <p>
                                35 Tân Lập, phường Đông Hòa, tx DĨ An, tỉnh Bình
                                Dương
                            </p>
                        </div>
                        <div className={cx('row')}>
                            <h5>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faEnvelope}
                                />
                                Email
                            </h5>
                            <p>vientran1999@gmail.com</p>
                        </div>
                        <div className={cx('follow-us')}>
                            <h4 className={cx('title')}>Follow us</h4>
                            <div className={cx('links')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faInstagram}
                                />
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faFacebookSquare}
                                />
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faGithubSquare}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('form-contact')}>
                    <h4 className={cx('title')}>Contact Form</h4>
                    <div className={cx('body-form')}>
                        <div className={cx('row')}>
                            <div className={cx('colum')}>
                                <TextInput
                                    lable={'First name'}
                                    className={cx('input-form')}
                                    line
                                    small
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className={cx('colum')}>
                                <TextInput
                                    lable={'Last name'}
                                    className={cx('input-form')}
                                    line
                                    small
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('colum')}>
                                <TextInput
                                    lable={'Email'}
                                    className={cx('input-form')}
                                    line
                                    small
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className={cx('colum')}>
                                <TextInput
                                    lable={'Phone'}
                                    className={cx('input-form')}
                                    line
                                    small
                                    placeholder="Enter your phone"
                                />
                            </div>
                        </div>
                        <div className={cx('row')}>
                            <TextInput
                                lable={'Message'}
                                className={cx('input-form')}
                                line
                                small
                                placeholder="Write your message"
                            />
                        </div>
                    </div>

                    <Button className={cx('button-submit')} primary>
                        Send message
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
