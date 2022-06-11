import classNames from 'classnames/bind';
import styles from './SubMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import config from '~/config';
const cx = classNames.bind(styles);

function SubMenu({ menus }) {
    const currentPath = useLocation().pathname.split('/')[2] || '';

    return (
        <div className={cx('menu')}>
            <Button
                to={config.routes.profile}
                className={cx(
                    'menu-item',
                    `${currentPath}` === '' ? 'active' : '',
                )}
                leftIcon={<FontAwesomeIcon icon={faBook} />}
            >
                Posts
            </Button>
            <Button
                to={config.routes.saved}
                className={cx(
                    'menu-item',
                    `${currentPath}` === 'saved' ? 'active' : '',
                )}
                leftIcon={<FontAwesomeIcon icon={faBookmark} />}
            >
                Saved
            </Button>
        </div>
    );
}

export default SubMenu;
