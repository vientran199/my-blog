import classNames from 'classnames/bind';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icon';
import { useState, memo } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchText, setSearchText] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef();

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };


    return (
        <div className={cx('wrapper')}>
            <input
                ref={inputRef}
                type={'text'}
                value={searchText}
                onChange={(e) => handleChange(e)}
                placeholder="Type to search"
            />

            {!!searchText && !false && (
                <button
                    className={cx('search-clear')}
                    onClick={(e) => {
                        setSearchText('');
                        // setSearchResult([]);
                        inputRef.current.focus();
                    }}
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}

            {false && (
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            )}
            {!isOpen ? (
                <button
                    className={cx('action-btn')}
                    onClick={() => {
                        inputRef.current.focus();
                        setIsOpen(true);
                    }}
                >
                    <SearchIcon className={cx('icon')} />
                </button>
            ) : (
                <Link
                    className={cx('action-btn')}
                    to={`/search?q=${searchText}`}
                    onClick={() => {
                        setIsOpen(false);
                        setSearchText('');
                    }}
                >
                    <SearchIcon className={cx('icon')} />
                </Link>
            )}
        </div>
    );
}

export default memo(Search);
