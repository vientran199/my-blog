import {
    faBookmark,
    faComment,
    faEarthAsia,
    faHeart,
    faLock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

function NewsCard({ data, className }) {
    const getUrl = () => {
        const im = data.imageCover.slice(11).replace('\\', '/')
        const url = `http://localhost:5000/${im}`
        return url
    }

    const classes = cx('card', {
        [className]: className
    })

    const handleClick = () => {
        console.log('test')
    }
    return (
        <figure className={classes}>

            <div className={cx('image')}>
                <Image
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
                    <div className={cx('status')}>
                        <span>Status:</span>
                        <FontAwesomeIcon icon={data.status ? faEarthAsia : faLock} />
                    </div>
                    <div className={cx('react')}>
                        <div className={cx('love')}>
                            <FontAwesomeIcon icon={faHeart} />
                            <span>623</span>
                        </div>
                        <div className={cx('commen')}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>23</span>
                        </div>
                        <div className={cx('views')} onClick={handleClick}>
                            <FontAwesomeIcon icon={faBookmark} />
                            <span>123</span>
                        </div>
                    </div>
                </footer>
            </figcaption>
            <Link to={`/post/${data._id}`} id='a'></Link>
        </figure>
    );
}

export default NewsCard;
