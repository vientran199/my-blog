import classNames from 'classnames/bind';
import styles from './SubMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { stringToUnicode } from '~/helper';
const cx = classNames.bind(styles);

function SubMenu({ menus }) {
    const { authState } = useContext(AuthContext)
    const currentPath = useLocation().pathname.split('/')[2] || '';
    const slug = stringToUnicode(authState.user.fullName)

    return (
        <div className={cx('menu')}>
            <Button
                to={`/${slug}`}
                className={cx(
                    'menu-item',
                    `${currentPath}` === '' ? 'active' : '',
                )}
                leftIcon={<FontAwesomeIcon icon={faBook} />}
            >
                Posts
            </Button>
            <Button
                to={`/${slug}/saved`}
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
