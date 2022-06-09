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

const cx = classNames.bind(styles);

function User({ data }) {
    const { authState, updateInfo } = useContext(AuthContext);
    const user = authState.user;
    const [isEdit, setIsEdit] = useState(false);
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

    const handleSubmit = async () => {
        try {
            const data = await updateInfo(profile);
            if (data) {
                setIsEdit(false);
            }

        } catch (error) {
            console.log(error)
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
                                <Button href={`https://www.facebook.com/${profile.facebook}`} className={cx('link')} target='_blank' rel="noreferrer">
                                    {profile.facebook}
                                </Button>
                            </div>
                        )}
                    </div>
                )
                }
                {
                    (profile.instagram || isEdit) && (
                        <div className={cx('row')}>
                            <FontAwesomeIcon
                                className={cx('icon')}
                                icon={faInstagram}
                            />
                            {isEdit ? <TextInput
                                className={cx(
                                    'text-control',
                                    !isEdit ? 'none-line' : '',
                                )}
                                line
                                name="instagram"
                                value={profile.instagram}
                                onChange={(e) => handleChange(e)}
                                readOnly={!isEdit}
                            /> :
                                <div className={cx('text-control')}>
                                    <Button href={`https://www.instagram.com/${profile.instagram}`} className={cx('link')} target='_blank' rel="noreferrer">
                                        {profile.instagram}
                                    </Button>
                                </div>
                            }
                        </div>
                    )
                }
                <div className={cx('row')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    <span>Join at {formatDate(user.created_at).mdy}</span>
                </div>
            </div >
        );
    };
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('avatar')}>
                <img
                    src={profile.image ? profile.image : images.noImage}
                    alt="no-i"
                />
                <Button className={cx('change-btn')}>
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
    );
}

export default User;
