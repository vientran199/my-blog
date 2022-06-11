import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './TextInput.module.scss';

const cx = classNames.bind(styles);

function TextInput({
    lable,
    tag = 'input',
    line = false,
    rounded = false,
    small = false,
    lagre = false,
    leftIcon,
    error,
    value,
    onChange,
    className,
    readOnly = false,
    ...rest
}) {
    const classes = cx('text-control', {
        [className]: className,
        small,
        lagre,
        line,
        rounded,
        error,
    });

    return (
        <div className={cx('wrapper')}>
            {lable && <label>{lable}</label>}
            <Tippy visible={!!error} zIndex='1' placement="right" content={error}>
                <div className={classes}>
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    {tag === 'input' ? (
                        <input
                            type="text"
                            value={value}
                            onChange={onChange}
                            readOnly={readOnly}
                            {...rest}
                        />
                    ) : (
                        <textarea
                            value={value}
                            onChange={onChange}
                            rows="4"
                            {...rest}
                        ></textarea>
                    )}
                </div>
            </Tippy>
        </div>
    );
}

TextInput.propTypes = {
    lable: PropTypes.string,
    tag: PropTypes.string,
    line: PropTypes.bool,
    rounded: PropTypes.bool,
    small: PropTypes.bool,
    lagre: PropTypes.bool,
    leftIcon: PropTypes.node,
    error: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    readOnly: PropTypes.bool,
}
export default TextInput;
