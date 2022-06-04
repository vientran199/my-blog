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
            <Tippy visible={!!error} placement="right" content={error}>
                <div className={classes}>
                    {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
                    {tag === 'input' ? (
                        <input
                            type="text"
                            value={value}
                            onChange={onChange}
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

export default TextInput;
