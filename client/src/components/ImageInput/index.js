import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { memo, useCallback } from 'react';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

function ImageInput({ title, value, error, onChange, className, ...rest }) {
    const classes = cx('file-upload', {
        [className]: className,
        error,
    });

    const getURL = useCallback(() => {
        if (typeof value === 'object') {
            return URL.createObjectURL(value);
        } else {
            return `http://localhost:5000/${value.slice(11).replace('\\', '/')}`
        }
    }, [value]);
    return (
        <div className={classes}>
            <Tippy
                visible={!!error}
                zIndex="1"
                placement="bottom"
                content={error}
            >
                <div className={cx('image-upload-wrap')}>
                    <input
                        className={cx('file-upload-input')}
                        type="file"
                        onChange={onChange}
                        accept="image/*"
                        alt="anh"
                        {...rest}
                    />

                    <div className={cx('drag')}>
                        {!value && (
                            <div className={cx('icon-add')}>
                                <span>{title}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Tippy>

            {value && (
                <img
                    className={cx('file-upload-image')}
                    src={getURL()}
                    alt="your anh"
                />
            )}
        </div>
    );
}

ImageInput.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,

}
export default memo(ImageInput);
