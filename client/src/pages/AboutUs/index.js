import {
    faInstagram,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './AboutUs.module.scss';

const cx = classNames.bind(styles);

function AboutUs() {
    return (
        <div className={cx('content')}>
            <div className={cx('heading')}>
                <img
                    className={cx('heading-logo')}
                    src={images.logo}
                    alt="heading-logo"
                />
                <p className={cx('description')}>
                    MyBlog where to record great moments in your life
                </p>
            </div>

            <div className={cx('main')}>
                <div className={cx('para-1')}>
                    <div className={cx('tagline')}>
                        <h4>We tell stories that drives the heart.</h4>
                        <p>
                            Laboris consectetur sunt nulla eiusmod voluptate
                            eiusmod dolor nisi qui dolor cillum fugiat ad. Id
                            sit mollit labore sunt sit culpa qui minim pariatur
                            et officia elit id. Tempor cupidatat veniam esse ad
                            veniam dolore excepteur tempor dolor consectetur ut
                            id.
                        </p>
                    </div>
                    <img
                        className={cx('image')}
                        src={images.picture1}
                        alt="anh 1"
                    />
                </div>
                <div className={cx('para-2')}>
                    <img
                        className={cx('image')}
                        src={images.picture2}
                        alt="anh 2"
                    />
                    <div className={cx('tagline')}>
                        <h4>We tell the news that makes the most impact.</h4>
                        <p>
                            Laboris consectetur sunt nulla eiusmod voluptate
                            eiusmod dolor nisi qui dolor cillum fugiat ad. Id
                            sit mollit labore sunt sit culpa qui minim pariatur
                            et officia elit id. Tempor cupidatat veniam esse ad
                            veniam dolore excepteur tempor dolor consectetur ut
                            id.
                        </p>
                    </div>
                </div>
                <div className={cx('tagline', 'para-3')}>
                    <h4>We share the little moments that shows we’re alive.</h4>
                    <p>
                        Laboris consectetur sunt nulla eiusmod voluptate eiusmod
                        dolor nisi qui dolor cillum fugiat ad. Id sit mollit
                        labore sunt sit culpa qui minim pariatur et officia elit
                        id. Tempor cupidatat veniam esse ad veniam dolore
                        excepteur tempor dolor consectetur ut id.
                    </p>
                </div>

                <div className={cx('casourel')}>
                    <img
                        className={cx('image')}
                        src={images.picture5}
                        alt="anh 5"
                    />

                    <img
                        className={cx('image')}
                        src={images.picture4}
                        alt="anh 4"
                    />

                    <img
                        className={cx('image')}
                        src={images.picture3}
                        alt="anh 3"
                    />
                </div>
            </div>
            <div className={cx('contact')}>
                <h4 className={cx('heading-contact')}>Want to connect?</h4>
                <p>
                    Laboris consectetur sunt nulla eiusmod
                    <br /> voluptate eiusmod dolor nisi qui..
                </p>
                <div className={cx('social-media')}>
                    <a href="https://www.facebook.com/">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://www.facebook.com/">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.facebook.com/">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
