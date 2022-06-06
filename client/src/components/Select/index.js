import classNames from "classnames/bind";
import styles from './Select.module.scss'

const cx = classNames.bind(styles)

const defaultFnc = () => { }
function Select({ items = [], onChange = defaultFnc }) {
    return <div className={cx('test')}></div>
}

export default Select;