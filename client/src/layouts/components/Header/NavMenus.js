import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavMenus({ menus }) {
    const currentPath = useLocation().pathname.split('/')[1] || '';

    return (
        <div className={cx('menu')}>
            {menus.map((item, index) => {
                return (
                    <Button
                        className={cx(
                            'menu-item',
                            `/${currentPath}` === item.path ? 'active' : '',
                        )}
                        to={item.path}
                        key={index}
                        primary
                        slideup
                        small
                    >
                        {item.title}
                    </Button>
                );
            })}
        </div>
    );
}

export default NavMenus;
