import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NewsCard from '~/components/NewsCard';
import NewsCardSkeleton from '~/components/NewsCard/NewsCardSkeleton';
import Button from '~/components/Button';
import { useEffect, useState, memo } from 'react';
import * as postServices from '~/services/postServices';
import ConfirmModal from '~/components/ConfirmModal';

const cx = classNames.bind(styles);

function Profile() {
    const [filter, setFilter] = useState({
        status: 'all',
    });
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [postSelected, setPostSelected] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            const response = await postServices.getPost(filter);
            setPosts(response.posts);
            setIsLoading(false);
        };
        fetchApi();
    }, [filter]);

    const handleDelete = async (postId) => {
        const response = await postServices.deleteById(postId);
        if (response.success) {
            const postDelete = response.postDelete;
            setPosts((prev) =>
                prev.filter((post) => post._id !== postDelete._id),
            );
        }
        setIsOpen(false);
    };

    const handleChange = (e) => {
        setFilter((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const render = () => {
        if (isLoading) {
            return [...Array(6)].map((_, index) => (
                <div className={cx('post')} key={index}>
                    <NewsCardSkeleton className={cx('detail')} />
                </div>
            ));
        }
        if (!isLoading && posts.length === 0) {
            return (
                <div className={cx('no-content')}>
                    <p>
                        You don't have any posts yet. <br></br>You can write
                        posts here{' '}
                        <Button to={'/write'} text>
                            Create a post
                        </Button>
                    </p>
                </div>
            );
        } else
            return posts.map((post) => (
                <div className={cx('post')} key={post._id}>
                    <div className={cx('actions')}>
                        <Button
                            to={`/write/${post._id}`}
                            className={cx('btn-edit')}
                        >
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                        <Button
                            onClick={() => {
                                setIsOpen(true);
                                setPostSelected(post._id);
                            }}
                            className={cx('btn-delete')}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                    <NewsCard className={cx('detail')} data={post}></NewsCard>
                </div>
            ));
    };
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('filter')}>
                    <label htmlFor="status">Show post:</label>
                    <div className={cx('select')}>
                        <select
                            name="status"
                            value={filter.status}
                            onChange={(e) => handleChange(e)}
                            id="status"
                        >
                            <option value="all">All</option>
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                        <span className={cx('focus')}></span>
                    </div>
                </div>
                <div className={cx('content')}>{render()}</div>
            </div>
            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => handleDelete(postSelected)}
                title="Conform delete post"
                description="Are you sure delete this post?"
                cancelText="No"
                confirmText="Yes"
            ></ConfirmModal>
        </>
    );
}

export default memo(Profile);
