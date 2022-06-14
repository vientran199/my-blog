import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ButtonBack.module.scss';
import Tippy from '@tippyjs/react';

import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ButtonBack({ className }) {
    const nav = useNavigate();
    return (
        <Tippy content="Back" placement="bottom">
            <div className={className}>
                <Button
                    onClick={() => nav(-1)}
                    className={cx('btn-back')}
                    outline
                    small
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Button>
            </div>
        </Tippy>
    );
}

ButtonBack.propTypes = {
    className: PropTypes.string,
};
export default ButtonBack;
