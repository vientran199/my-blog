import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Wrapper from '../Wrapper';
import MenuItem from './MenuItem';
import { useState } from 'react';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({
    children,
    user,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    data={item}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    return (
        <Tippy
            appendTo={() => document.body}
            interactive
            trigger="click"
            placement="bottom-end"
            hideOnClick={hideOnClick}
            render={(attrs) => (
                <div className={cx('menu-list')} {...attrs}>
                    <Wrapper className={cx('menu-popper')}>
                        <div className={cx('user')}>
                            Signed in as <br />
                            <span>{user}</span>
                        </div>
                        {history.length > 1 && (
                            <Header title={current.title} onBack={handleBack} />
                        )}

                        <div className={cx('menu-body')}>{renderItem()}</div>
                    </Wrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    user: PropTypes.string,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
