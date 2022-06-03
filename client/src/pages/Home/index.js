import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import images from '~/assets/images';
import NewsCard from '~/components/NewsCard';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('content')}>
            <div className={cx('banner')}>
                <img
                    className={cx('image-cover')}
                    src={images.imageCover}
                    alt="cover"
                />
                <div className={cx('heading')}>
                    <h2 className={cx('heading-main')}>Wellcome to MyBlog</h2>
                    <p className={cx('description')}>
                        Share and save your memories.
                    </p>
                </div>
            </div>

            <div className={cx('list-news')}>
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
                <NewsCard></NewsCard>
            </div>
        </div>
    );
}

export default Home;
