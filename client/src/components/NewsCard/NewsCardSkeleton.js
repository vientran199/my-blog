import classNames from 'classnames/bind';
import styles from './NewsCard.module.scss';

const cx = classNames.bind(styles);

function NewsCardSkeleton({ className }) {
    const classes = cx('card', 'Skeleton', {
        [className]: className,
    });
    return (
        <figure className={classes}>
            <div className={cx('image')}></div>
            <figcaption>
                <div className={cx('date')}>
                    <span className={cx('day')}></span>
                    <span className={cx('month')}></span>
                </div>
                <p className={cx('title')}></p>
                <p className={cx('description')}></p>
                <footer></footer>
            </figcaption>
        </figure>
    );
}

export default NewsCardSkeleton;
