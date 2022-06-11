import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return (
        <div className={cx('wrapper')}>
            <img src={images.logo1} alt="logo" />
            <div className={cx('main')}>
                <p>Loading...</p>
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            </div>
        </div>
    );
}

export default Loading;
