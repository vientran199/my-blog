import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { stringToUnicode } from '~/helper';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
    const { authState } = useContext(AuthContext)
    const classes = cx('menu-item', {
        separate: data.separate
    })

    const getURL = () => {
        if (data.to && data.to.startsWith('/:')) {
            return `/${stringToUnicode(authState.user.userName)}`
        }
        return data.to
    }

    return (
        <Button className={classes} leftIcon={data.icon} to={getURL()} onClick={onClick}>
            {data.title}
        </Button>
    );
}
MenuItem.propTypes = {
    data: PropTypes.object
}

export default MenuItem;