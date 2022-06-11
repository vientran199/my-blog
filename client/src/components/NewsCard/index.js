import PropTypes from 'prop-types';
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
import { formatDate } from '~/helper';
import styles from './NewsCard.module.scss';
import * as postServices from '~/services/postServices';
import { useContext, useState } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function NewsCard({ data, className }) {
    const { authState } = useContext(AuthContext);
    const nav = useNavigate();

    const authId = authState.isAuthenticated ? authState.user._id : '';
    const [checked, setChecked] = useState({
        love: data.react.love.includes(authId),
        marked: data.react.marked.includes(authId),
    });
    const [count, setCount] = useState({
        love: data.react.love.length,
        marked: data.react.marked.length,
    });

    const getUrl = () => {
        const im = data.imageCover.slice(11).replace('\\', '/');
        const url = `http://localhost:5000/${im}`;
        return url;
    };

    const classes = cx('card', {
        [className]: className,
    });

    const handleClick = async (type, id) => {
        if (!authId) {
            const isRedirect = window.confirm(
                'You are not logged in. Do you want to login?',
            );
            if (isRedirect) {
                nav('/login');
            }
            return;
        }
        if (data.auth === authId && type === 'marked') {
            return;
        }
        const res = await postServices.updateReact(type, id);
        if (res.success) {
            setCount((prev) => ({
                ...prev,
                [type]: res.length,
            }));
            setChecked((prev) => ({
                ...prev,
                [type]: !prev[type],
            }));
        }
    };
    return (
        <figure className={classes}>
            <div className={cx('image')}>
                <Image src={getUrl()} alt="pr-sample11" />
            </div>
            <figcaption>
                <div className={cx('date')}>
                    <span className={cx('day')}>
                        {formatDate(data.create_at).day}
                    </span>
                    <span className={cx('month')}>
                        {formatDate(data.create_at).month}
                    </span>
                </div>
                <h3 className={cx('title')}>{data.title} </h3>
                <p className={cx('description')}>{data.description}</p>
                <footer>
                    <div className={cx('status')}>
                        <span>Status:</span>
                        <FontAwesomeIcon
                            icon={data.status ? faEarthAsia : faLock}
                        />
                    </div>
                    <div className={cx('react')}>
                        <div
                            className={cx('love')}
                            onClick={() => handleClick('love', data._id)}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={cx(checked.love ? 'loved' : '')}
                            />
                            <span>{count.love}</span>
                        </div>
                        <div className={cx('commen')}>
                            <FontAwesomeIcon icon={faComment} />
                            <span>{data.react.commen.length}</span>
                        </div>
                        <div
                            className={cx('mark')}
                            onClick={() => handleClick('marked', data._id)}
                        >
                            <FontAwesomeIcon
                                icon={faBookmark}
                                className={cx(checked.marked ? 'marked' : '')}
                            />
                            <span>{count.marked}</span>
                        </div>
                    </div>
                </footer>
            </figcaption>
            <Link to={`/post/${data._id}`} id="a"></Link>
        </figure>
    );
}

NewsCard.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string
}
export default NewsCard;
