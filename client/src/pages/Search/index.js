import { useLocation } from 'react-router-dom';
import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import NewsCard from '~/components/NewsCard';
import * as postServices from '~/services/postServices'

const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [errorSearchText, setErrorSearchText] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.search) {
            const text = location.search.split('=')[1] || '';
            const textDecode = decodeURIComponent(text)
            setSearchText(textDecode);
            handleSearch(textDecode)
        }
    }, [location]);

    const handleSearch = async (text) => {
        if (!text) {
            setErrorSearchText('Required')
            setSearchResult([])
            return
        } else {
            setErrorSearchText('')
        }
        try {
            const data = await postServices.search(text)
            setSearchResult(data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('search-form')}>
                <Button className={cx('btn-search')} primary small onClick={() => handleSearch(searchText)}>
                    Search
                </Button>
                <TextInput className={cx('text-control')} primary small value={searchText} onChange={e => setSearchText(e.target.value)} error={errorSearchText} />
            </div>
            <div className={cx('search-result')}>
                {searchResult.length === 0 ? <div className={cx('no-result')}><h3>Không tìm thấy kết quả</h3>
                    <p>Hãy thử các từ khóa khác nhau hoặc xóa bộ lọc tìm kiếm</p></div> :
                    searchResult.map(post => <NewsCard key={post._id} data={post} />)}
            </div>
        </div>
    );
}

export default memo(Search);
