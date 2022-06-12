import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function ConfirmModal({
    title,
    isOpen = false,
    onClose,
    onConfirm,
    description,
    cancelText = 'Hủy',
    confirmText = 'Xác nhận',
}) {
    const clasess = cx('wrapper', {
        isOpen,
    })
    return <div className={clasess}>
        <div className={cx('content')}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('description')}>{description}</p>
            <div className={cx('actions')}>
                <Button className={cx('btn-cancel')} primary onClick={onClose}>{cancelText}</Button>
                <Button className={cx('btn-confirm')} primary onClick={onConfirm}>{confirmText}</Button>
            </div>
        </div>
    </div>;
}

ConfirmModal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    description: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
}
export default ConfirmModal;
