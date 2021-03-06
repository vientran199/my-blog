import classNames from 'classnames/bind';
import styles from './Saved.module.scss';

import NewsCard from '~/components/NewsCard';
import NewsCardSkeleton from '~/components/NewsCard/NewsCardSkeleton';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import * as postServices from '~/services/postServices';

const cx = classNames.bind(styles);

function Saved() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            const { posts } = await postServices.getPostSaved();

            setPosts(
                posts.map((post) => ({
                    ...post.post,
                    react: {
                        love: post.love,
                        marked: post.marked,
                        commen: post.commen,
                    },
                })),
            );
            setIsLoading(false);
        };
        fetchApi();
    }, []);

    const render = () => {
        if (isLoading) {
            return [...Array(6)].map((_, index) => (
                <NewsCardSkeleton className={cx('post')} key={index} />
            ));
        }
        if (!isLoading && posts.length === 0) {
            return (
                <div className={cx('no-content')}>
                    <p>
                        You don't have any saved posts yet. <br></br>You can see
                        other posts here
                        <Button to={'/'} text>
                            More posts
                        </Button>
                    </p>
                </div>
            );
        } else
            return posts.map((post) => (
                <NewsCard
                    className={cx('post')}
                    key={post._id}
                    data={post}
                ></NewsCard>
            ));
    };
    return (
        <div className={cx('container')}>
            <div className={cx('content')}>{render()}</div>
        </div>
    );
}

export default Saved;
