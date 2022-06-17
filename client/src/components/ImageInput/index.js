import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

function ImageInput({ title, value, error, onChange, className, ...rest }) {
    const [urlImage, setUrlImage] = useState(value);
    const classes = cx('file-upload', {
        [className]: className,
        error,
    });
    useEffect(() => {
        if (value) {
            if (typeof value === 'object') {
                value.preview = URL.createObjectURL(value);
                setUrlImage(value.preview);
            } else {
                setUrlImage(value);
            }
        }

        return () => value && URL.revokeObjectURL(value.preview);
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
                        {(!urlImage || !value) && (
                            <div className={cx('icon-add')}>
                                <span>{title}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Tippy>

            {urlImage && value && (
                <img
                    className={cx('file-upload-image')}
                    src={urlImage}
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
};
export default memo(ImageInput);
