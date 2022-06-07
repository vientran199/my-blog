import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCamera, faClock, faHouseChimney, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';

import images from '~/assets/images';
import Button from '~/components/Button';
import { AuthContext } from '~/contexts/AuthContext';
import styles from './User.module.scss';

const cx = classNames.bind(styles);

function User({ data }) {
    const { authState } = useContext(AuthContext)
    const user = authState.user
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('avatar')}><img src={images.noImage} alt="no-i" />
                <Button className={cx('change-btn')} >
                    <FontAwesomeIcon icon={faCamera} />
                </Button>
            </div>
            <h4 className={cx('name')}>{user.fullName}</h4>
            <div className={cx('intro')}>
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faHouseChimney} />
                    <span>Quang ngai</span>
                </div>
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                    <span>Sai gon</span>
                </div>
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faFacebookF} />
                    <span>Link fb</span>
                </div>
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faInstagram} />
                    <span>Link instagram</span>
                </div>
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    <span>Join at</span>
                </div>

            </div>
        </aside>
    );
}

export default User;
