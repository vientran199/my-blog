import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faCamera,
    faCheck,
    faClock,
    faHouseChimney,
    faLocationDot,
    faPenToSquare,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';

import images from '~/assets/images';
import Button from '~/components/Button';
import { AuthContext } from '~/contexts/AuthContext';
import styles from './User.module.scss';
import { formatDate } from '~/helper';
import TextInput from '~/components/TextInput';
import UploadAvatarModal from './UploadAvatarModal';

const cx = classNames.bind(styles);

function User() {
    const { authState, updateInfo, updateAvatar } = useContext(AuthContext);
    const user = authState.user;
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [avatar, setAvatar] = useState(user.profile.image || '');
    const [profile, setProfile] = useState({
        address: user.profile.address || '',
        lives: user.profile.lives || '',
        facebook: user.profile.facebook || '',
        instagram: user.profile.instagram || '',
    });

    const handleCancel = () => {
        setProfile({
            address: user.profile.address || '',
            lives: user.profile.lives || '',
            facebook: user.profile.facebook || '',
            instagram: user.profile.instagram || '',
        });
        setIsEdit(false);
    };

    const handleChange = (e) => {
        setProfile((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleUpdateAvatar = async (imageSelect) => {
        try {
            const response = await updateAvatar(imageSelect);
            if (response.success) {
                setAvatar(response.newAvatar);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const data = await updateInfo(profile);
            setIsLoading(false);
            if (data) {
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const render = () => {
        return (
            <div className={cx('intro')}>
                {(profile.lives || isEdit) && (
                    <div className={cx('row')}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faHouseChimney}
                        />
                        <span>Lives in</span>
                        <TextInput
                            className={cx(
                                'text-control',
                                !isEdit ? 'none-line' : '',
                            )}
                            line
                            name="lives"
                            value={profile.lives}
                            onChange={(e) => handleChange(e)}
                            readOnly={!isEdit}
                        />
                    </div>
                )}
                {(profile.address || isEdit) && (
                    <div className={cx('row')}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faLocationDot}
                        />
                        <span>From in</span>
                        <TextInput
                            className={cx(
                                'text-control',
                                !isEdit ? 'none-line' : '',
                            )}
                            line
                            name="address"
                            value={profile.address}
                            onChange={(e) => handleChange(e)}
                            readOnly={!isEdit}
                        />
                    </div>
                )}
                {(profile.facebook || isEdit) && (
                    <div className={cx('row')}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faFacebookF}
                        />
                        {isEdit ? (
                            <TextInput
                                className={cx(
                                    'text-control',
                                    !isEdit ? 'none-line' : '',
                                )}
                                line
                                name="facebook"
                                value={profile.facebook}
                                onChange={(e) => handleChange(e)}
                                readOnly={!isEdit}
                            />
                        ) : (
                            <div className={cx('text-control')}>
                                <Button
                                    href={`${profile.facebook}`}
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {profile.facebook.split('/')[3]}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {(profile.instagram || isEdit) && (
                    <div className={cx('row')}>
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faInstagram}
                        />
                        {isEdit ? (
                            <TextInput
                                className={cx(
                                    'text-control',
                                    !isEdit ? 'none-line' : '',
                                )}
                                line
                                name="instagram"
                                value={profile.instagram}
                                onChange={(e) => handleChange(e)}
                                readOnly={!isEdit}
                            />
                        ) : (
                            <div className={cx('text-control')}>
                                <Button
                                    href={`${profile.instagram}`}
                                    className={cx('link')}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {profile.instagram.split('/')[3]}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    <span>Join at {formatDate(user.created_at).mdy}</span>
                </div>
            </div>
        );
    };
    return (
        <>
            <aside className={cx('wrapper')}>
                <div className={cx('avatar')}>
                    <img src={avatar ? avatar : images.noImage} alt="no-i" />
                    <Button
                        className={cx('change-btn')}
                        onClick={() => setIsOpen(true)}
                    >
                        <FontAwesomeIcon icon={faCamera} />
                    </Button>
                </div>
                <h4 className={cx('name')}>{user.fullName}</h4>
                {render()}
                {isEdit ? (
                    <>
                        <Button
                            className={cx('btn-submit')}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faCheck} />}
                            onClick={() => handleSubmit()}
                            isLoading={isLoading}
                        >
                            Submit
                        </Button>
                        <Button
                            className={cx('btn-cancel')}
                            primary
                            leftIcon={<FontAwesomeIcon icon={faXmark} />}
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        className={cx('btn-edit')}
                        primary
                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => setIsEdit(true)}
                    >
                        Edit profile
                    </Button>
                )}
            </aside>
            {isOpen && (
                <UploadAvatarModal
                    onClose={() => setIsOpen(false)}
                    onSubmit={handleUpdateAvatar}
                />
            )}
        </>
    );
}

export default User;
