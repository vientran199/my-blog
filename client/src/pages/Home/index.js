import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useContext, useEffect, useState } from 'react';

import images from '~/assets/images';
import NewsCard from '~/components/NewsCard';
import NewsCardSkeleton from '~/components/NewsCard/NewsCardSkeleton';
import Button from '~/components/Button';
import ConfirmModal from '~/components/ConfirmModal';
import * as siteServices from '~/services/siteServices';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Home() {
    const { authState } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const nav = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            const data = await siteServices.getPostsPublic();
            setPosts(data.posts);
            setIsLoading(false);
        };
        fetchApi();
    }, [authState]);

    const handleConfirm = () => {
        nav('/login');
    };
    const render = () => {
        if (isLoading) {
            return [...Array(8)].map((_, index) => (
                <NewsCardSkeleton className={cx('post')} key={index} />
            ));
        } else if (posts.length === 0) {
            return (
                <div className={cx('no-content')}>
                    <p>
                        No posts have been published yet. <br></br>You can write
                        posts here.
                        <Button to={'/write'} text>
                            Create a post
                        </Button>
                    </p>
                </div>
            );
        } else
            return posts.map((post) => (
                <NewsCard
                    key={post._id}
                    data={post}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                ></NewsCard>
            ));
    };
    return (
        <>
            <div className={cx('content')}>
                <div className={cx('banner')}>
                    <img
                        className={cx('image-cover')}
                        src={images.imageCover}
                        alt="cover"
                    />
                    <div className={cx('heading')}>
                        <h2 className={cx('heading-main')}>
                            Wellcome to MyBlog
                        </h2>
                        <p className={cx('description')}>
                            Share and save your memories.
                        </p>
                    </div>
                </div>

                <div className={cx('list-news')}>{render()}</div>
            </div>
            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                title="Go to login?"
                description="You are not logged in. Do you want to login?"
                cancelText="No"
                confirmText="Yes"
            />
        </>
    );
}

export default Home;
