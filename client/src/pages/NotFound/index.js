import classNames from "classnames/bind";
import styles from './NotFound.module.scss'

const cx = classNames.bind(styles)

function NotFound() {
    return <h2 className={cx('container')}>not found</h2>;
}

export default NotFound;