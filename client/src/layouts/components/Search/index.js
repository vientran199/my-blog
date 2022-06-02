import classNames from 'classnames/bind';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icon';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchText, setSearchText] = useState('');
    // const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

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

            {!!searchText && !loading && (
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

            {loading && (
                <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            )}
            <button
                className={cx('action-btn')}
                onClick={() => inputRef.current.focus()}
            >
                <SearchIcon className={cx('icon')} />
            </button>
        </div>
    );
}

export default Search;
