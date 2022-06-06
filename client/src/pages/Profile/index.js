import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import NewsCard from '~/components/NewsCard';
import { useEffect, useState } from 'react';
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
            <NewsCard
                className={cx('post')}
                key={post._id}
                data={post}
            ></NewsCard>
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

export default Profile;
