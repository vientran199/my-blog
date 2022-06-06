import classNames from "classnames/bind";
import styles from './Profile.module.scss'

import NewsCard from "~/components/NewsCard";
const data = {
    imageCover: 'src\\public\\uploads\\imageCover-1654420716347-605832828',
    title: 'test1',
    description: 'test1'
}

const cx = classNames.bind(styles)

function Profile() {
    return <div className={cx('container')}>
        <NewsCard className={cx('post')} data={data}></NewsCard>
        <NewsCard className={cx('post')} data={data}></NewsCard>
        <NewsCard className={cx('post')} data={data}></NewsCard>
        <NewsCard className={cx('post')} data={data}></NewsCard>
    </div>;
}

export default Profile;