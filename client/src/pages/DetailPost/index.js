import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './DetailPost.module.scss';
import Image from '~/components/Image';
import * as postServices from '~/services/postServices'
import { formatDate } from '~/helper';

const cx = classNames.bind(styles);

function DetailPost() {
    const [post, setPost] = useState(null)
    const postId = useLocation().pathname.split('/')[2];

    useEffect(() => {
        const fetchApi = async () => {
            const data = await postServices.getPostById(postId)
            if (data.success) {
                setPost(data.post)
            }
        }
        fetchApi()
    }, [postId])

    const getUrlImage = (url) => {
        const im = url.slice(11).replace('\\', '/')
        return `http://localhost:5000/${im}`
    }

    const render = () => {
        if (!post) {
            return (<div></div>)
        }
        else {
            return (
                <div className={cx('content')}>
                    <div className={cx('image-cover')}>
                        <Image src={getUrlImage(post.imageCover)} alt="cover" />
                    </div>
                    <div className={cx('heading')}>
                        <h3 className={cx('title')}>{post.title}</h3>
                        <div className={cx('more-info')}>
                            <span>Written by: {post.auth.fullName}</span>
                            <span>Created: {formatDate(post.create_at).mdy}</span>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        {post.description}
                    </div>

                    <div className={cx('body')}>
                        {post.paragraph.map(item => {
                            return (
                                <div className={cx('para')} key={item._id}>
                                    {item.image && <Image src={getUrlImage(item.image)} alt="anh" />}
                                    <div className={cx('description')}>
                                        {item.description}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
    return (
        <>{render()}</>
    );
}

export default DetailPost;
