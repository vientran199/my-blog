import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import {
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NewsCard from '~/components/NewsCard';
import Button from '~/components/Button';
import { useEffect, useState, memo } from 'react';
import * as postServices from '~/services/postServices';

const cx = classNames.bind(styles);

function Profile() {
    const [filter, setFilter] = useState({
        status: 'all',
    });
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await postServices.getPost(filter);
            setPosts(response.posts);
        };
        fetchApi();
    }, [filter]);

    const handleDelete = async (postId) => {

        const response = await postServices.deleteById(postId)
        if (response.success) {
            const postDelete = response.postDelete
            setPosts(prev => (prev.filter(post => post._id !== postDelete._id)))
        }
    }

    const handleChange = (e) => {
        setFilter(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const render = () => {
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
                        onClick={() => handleDelete(post._id)}
                        className={cx('btn-delete')}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
                <NewsCard
                    className={cx('detail')}

                    data={post}
                ></NewsCard>
            </div>
        ));
    };
    return (
        <div className={cx('container')}>
            <div className={cx('filter')}>
                <label htmlFor="status">Show post:</label>
                <div className={cx('select')}>
                    <select name="status" value={filter.status} onChange={e => handleChange(e)} id="status">
                        <option value="all">All</option>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <span className={cx("focus")}></span>
                </div>
            </div>
            <div className={cx('content')}>{render()}</div>
        </div>
    );
}

export default memo(Profile);
