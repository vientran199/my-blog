import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, useState } from 'react';

import images from '~/assets/images';
import NewsCard from '~/components/NewsCard';
import * as siteServices from '~/services/siteServices'

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const data = await siteServices.getPostsPublic();
            setPosts(data.posts)
        }
        fetchApi()
    }, [])

    const render = () => {
        return posts.map(post =>
            <NewsCard key={post._id} data={post}></NewsCard>
        )
    }
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
                {render()}
            </div>
        </div>
    );
}

export default Home;
