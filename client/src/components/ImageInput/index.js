import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './ImageInput.module.scss';

const cx = classNames.bind(styles);

function ImageInput({ title, value, onChange, className, ...rest }) {
    const classes = cx('file-upload', {
        [className]: className,
    });
    const getURL = () => {
        return URL.createObjectURL(value)
    }
    return (
        <div className={classes}>
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
