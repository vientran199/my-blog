import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

function ImageInput({ title, value, error, onChange, className, ...rest }) {
    const classes = cx('file-upload', {
        [className]: className,
        error,
    });
    const getURL = () => {
        return URL.createObjectURL(value)
    }
    return (
        <div className={classes}>
            <Tippy
                visible={!!error} zIndex='1' placement="bottom" content={error}
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

export default memo(ImageInput);
