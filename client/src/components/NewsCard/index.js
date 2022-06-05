import {
    faBookmark,
    faComment,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

function NewsCard({ data }) {
    const getUrl = () => {
        const im = data.imageCover.slice(11).replace('\\', '/')
        const url = `http://localhost:5000/${im}`
        return url
    }
    return (
        <figure className={cx('card')}>
            <div className={cx('image')}>
                <img
                    src={getUrl()}
                    alt="pr-sample11"
                />
            </div>
            <figcaption>
                <div className={cx('date')}>
                    <span className={cx('day')}>28</span>
                    <span className={cx('month')}>Oct</span>
                </div>
                <h3 className={cx('title')}>{data.title} </h3>
                <p className={cx('description')}>
                    {data.description}
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
