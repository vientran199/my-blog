import classNames from 'classnames/bind';
import styles from './SubMenu.module.scss';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function SubMenu({ menus }) {
    return (
        <div className={cx('menu')}>
            <Button
                to={'#'}
                className={cx('menu-item', 'active')}
                leftIcon={<FontAwesomeIcon icon={faBook} />}
            >
                Posts
            </Button>
            <Button
                to={'#'}
                className={cx('menu-item')}
                leftIcon={<FontAwesomeIcon icon={faBookmark} />}
            >
                Saved
            </Button>
        </div>
    );
}

export default SubMenu;
