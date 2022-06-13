import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Wrapper } from '~/components/Popper';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import ImageInput from '~/components/ImageInput';
import { useState } from 'react';

const cx = classNames.bind(styles);

function UploadAvatarModal({ onClose, className, onSubmit }) {
    const [imageSelect, setImageSelect] = useState(null);

    const classes = cx('wrapper-modal', {
        [className]: className,
    });

    const handleSubmit = async () => {
        onSubmit(imageSelect);
        onClose();
    };
    return (
        <div className={classes}>
            <Wrapper className={cx('content-modal')}>
                <h3 className={cx('title-modal')}>Update profile picture</h3>
                <FontAwesomeIcon
                    className={cx('icon-close')}
                    icon={faClose}
                    onClick={onClose}
                />
                <form encType="multipart-form-data">
                    <ImageInput
                        className={cx('image-upload')}
                        title="Upload avatar"
                        name="avatar"
                        value={imageSelect}
                        onChange={(e) => setImageSelect(e.target.files[0])}
                    />
                </form>
                <div className={cx('actions')}>
                    <Button className={cx('cancel')} primary onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className={cx('upload')}
                        primary
                        onClick={handleSubmit}
                    >
                        Upload
                    </Button>
                </div>
            </Wrapper>
        </div>
    );
}

UploadAvatarModal.propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
};
export default UploadAvatarModal;
