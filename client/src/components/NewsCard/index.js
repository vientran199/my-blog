import {
    faBookmark,
    faComment,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
// import { Wrapper } from '../Popper';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

function NewsCard() {
    return (
        <figure className={cx('card')}>
            <div className={cx('image')}>
                <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample11.jpg"
                    alt="pr-sample11"
                />
            </div>
            <figcaption>
                <div className={cx('date')}>
                    <span className={cx('day')}>28</span>
                    <span className={cx('month')}>Oct</span>
                </div>
                <h3 className={cx('title')}>The World Ended Yesterday </h3>
                <p className={cx('description')}>
                    You know what we need, Hobbes? We need an attitude. Yeah,
                    you can't be cool if you don't have an attitude.
                </p>
                <footer>
                    <div className={cx('love')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>623</span>
                    </div>
                    <div className={cx('commen')}>
                        <FontAwesomeIcon icon={faComment} />
                        <span>23</span>
                    </div>
                    <div className={cx('views')}>
                        <FontAwesomeIcon icon={faBookmark} />
                        <span>123</span>
                    </div>
                </footer>
            </figcaption>
            <a href="/">{'  '}</a>
        </figure>
    );
}

export default NewsCard;
