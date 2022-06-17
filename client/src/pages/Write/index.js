import {
    faCirclePlus,
    faLock,
    faPlus,
    faUnlock,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '~/components/Button';
import ImageInput from '~/components/ImageInput';
import TextInput from '~/components/TextInput';
import styles from './Write.module.scss';
import * as postService from '~/services/postServices';
import * as imageServices from '~/services/imageServices';
import { AuthContext } from '~/contexts/AuthContext';
import ConfirmModal from '~/components/ConfirmModal';
import ButtonBack from '~/components/ButtonBack';

const cx = classNames.bind(styles);

function Write() {
    const { authState } = useContext(AuthContext);
    const nav = useNavigate();
    const postId = useLocation().pathname.split('/')[2] || '';

    const [isOpen, setIsOpen] = useState(false);
    const [valueForm, setValueForm] = useState({
        title: '',
        imageCover: '',
        description: '',
        paragraph: [],
        status: 'true',
    });
    const [errorValueForm, setErrorValueForm] = useState({
        title: '',
        imageCover: '',
        description: '',
    });
    const [paragraph, setParagraph] = useState([
        {
            image: null,
            description: '',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            const data = await postService.getPostById(postId);
            if (data.success) {
                setValueForm({
                    ...data.post,
                    status: data.post.status.toString(),
                });
                if (authState.user._id !== data.post.auth._id) {
                    alert('You not allow edit');
                    nav('/me');
                    return;
                }
                setParagraph(data.post.paragraph);
            } else {
                console.log('khong co post nay');
            }
        };
        if (postId) {
            fetchApi();
        }
        return () => {
            setValueForm({
                title: '',
                imageCover: '',
                description: '',
                paragraph: [],
                status: 'true',
            });
            setParagraph([
                {
                    image: null,
                    description: '',
                },
            ]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    const handleChangeParagrph = (e, index) => {
        let f = null;
        const isFile = e.target.files;
        if (isFile) {
            f = e.target.files[0];
        }
        let temp = {
            ...paragraph[index],
            [e.target.name]: isFile ? f : e.target.value,
        };
        setParagraph((prev) => {
            prev[index] = temp;
            return [...prev];
        });
    };

    const handleDeleteRow = async (key) => {
        let temp = await paragraph.filter((item, index) => index !== key);
        setParagraph([...temp]);
    };

    const handleAddRow = (e) => {
        e.preventDefault();
        let temp = paragraph;
        if (paragraph.length >= 10) {
            alert('You can only add 10 photos');
            return;
        }
        temp.push({
            image: '',
            description: '',
        });
        setParagraph([...temp]);
    };

    const handleChangeForm = (e) => {
        let f = null;
        const isFile = e.target.files;
        if (isFile) {
            f = e.target.files[0];
        }
        setValueForm({
            ...valueForm,
            [e.target.name]: isFile ? f : e.target.value,
        });
    };
    const handleSubmit = async (e, type) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setIsLoading(true);
        const images = [
            valueForm.imageCover,
            ...paragraph.map((item) => item.image),
        ];
        let urlsImage = await imageServices.uploadImage(images, setIsLoading);

        Promise.all(urlsImage)
            .then((values) => {
                const [imageCover, ...images] = values;
                const formData = {
                    ...valueForm,
                    imageCover: imageCover,
                    paragraph: paragraph
                        .map((para, index) => {
                            let temp = {};
                            if (para.image && para.description) {
                                temp = {
                                    image: images[index],
                                    description: para.description,
                                };
                            } else if (para.image) {
                                temp = {
                                    image: images[index],
                                    description: para.description,
                                };
                            } else if (para.description) {
                                temp = {
                                    image: '',
                                    description: para.description,
                                };
                            }
                            return temp;
                        })
                        .filter((item) => item.description || item.image),
                };
                if (type === 'created') {
                    return postService.create(formData);
                } else if (type === 'edited') {
                    return postService.updatePost(postId, formData);
                }
            })
            .then((response) => {
                setIsLoading(false);
                if (response.success) {
                    alert(response.message);
                    nav(`/me`);
                } else {
                    alert(response.message);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };
    const validate = () => {
        let isSubmittable = true;
        const valuesKeys = Object.keys(errorValueForm);
        valuesKeys.forEach((key) => {
            if (valueForm[key] === '') {
                setErrorValueForm((prev) => ({
                    ...prev,
                    [key]: 'Required',
                }));
                isSubmittable = false;
            } else {
                setErrorValueForm((prev) => ({
                    ...prev,
                    [key]: '',
                }));
            }
        });

        return isSubmittable;
    };
    const renderMoreImage = useCallback(() => {
        return paragraph.map((item, index) => (
            <div key={index} className={cx('mb', 'more-para')}>
                <FontAwesomeIcon
                    className={cx('delete')}
                    icon={faXmark}
                    onClick={() => handleDeleteRow(index)}
                />
                <ImageInput
                    index={index}
                    className={cx('more-image')}
                    value={item.image}
                    onChange={(e) => handleChangeParagrph(e, index)}
                    name="image"
                ></ImageInput>
                <div className={cx('wrap')}>
                    <TextInput
                        className={cx('input-title')}
                        tag="textarea"
                        line
                        small
                        value={item.description}
                        onChange={(e) => handleChangeParagrph(e, index)}
                        placeholder="Write your message"
                        rows={'7'}
                        name="description"
                    />
                </div>
            </div>
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paragraph]);
    return (
        <>
            <div className={cx('content')}>
                <div className={cx('heading')}>
                    <ButtonBack className={cx('btn-back')} />
                    <h3 className={cx('heading-title')}>
                        {postId ? 'Edit post' : 'Write blog'}
                    </h3>
                    {postId ? (
                        ''
                    ) : (
                        <p className={cx('description')}>
                            Write a blog to save memories you remember ^^
                        </p>
                    )}
                </div>
                <form encType="multipart-form-data">
                    <div className={cx('form-blog')}>
                        <ImageInput
                            className={cx('mb', 'image-cover')}
                            title={'Drop image cover'}
                            name="imageCover"
                            value={valueForm.imageCover}
                            onChange={handleChangeForm}
                            error={errorValueForm.imageCover}
                        ></ImageInput>
                        <TextInput
                            className={cx('mb', 'input-title')}
                            leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                            line
                            small
                            name="title"
                            placeholder="Title"
                            value={valueForm.title}
                            onChange={handleChangeForm}
                            error={errorValueForm.title}
                        />
                        <TextInput
                            className={cx('mb', 'input-title')}
                            tag="textarea"
                            line
                            small
                            name="description"
                            placeholder="Write your story"
                            value={valueForm.description}
                            onChange={handleChangeForm}
                            error={errorValueForm.description}
                        />
                        {renderMoreImage()}
                        <Button
                            className={cx('mb', 'btn-add-more')}
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            rounded
                            outline
                            small
                            onClick={(e) => handleAddRow(e)}
                        >
                            Add more picture
                        </Button>

                        <div className={cx('status')}>
                            <div>Who can see?</div>
                            <div className={cx('group-radio')}>
                                <label className={cx('option')}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value={true}
                                        checked={valueForm.status === 'true'}
                                        onChange={handleChangeForm}
                                    />
                                    <FontAwesomeIcon
                                        className={cx('icon')}
                                        icon={faUnlock}
                                    />
                                    <span>
                                        Anyone on the internet can see this post
                                    </span>
                                </label>
                                <label className={cx('option')}>
                                    <input
                                        type="radio"
                                        name="status"
                                        value={false}
                                        checked={valueForm.status === 'false'}
                                        onChange={handleChangeForm}
                                    />
                                    <FontAwesomeIcon
                                        className={cx('icon')}
                                        icon={faLock}
                                    />
                                    <span>Only you can see this post</span>
                                </label>
                            </div>
                        </div>
                        {postId ? (
                            <>
                                <Button
                                    className={cx('btn-save')}
                                    primary
                                    onClick={(e) => handleSubmit(e, 'edited')}
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Save
                                </Button>
                                <Button
                                    className={cx('btn-cancel')}
                                    primary
                                    onClick={(e) => handleCancel(e)}
                                    type="cancel"
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className={cx('btn-publish')}
                                    primary
                                    onClick={(e) => handleSubmit(e, 'created')}
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Publish
                                </Button>
                                <Button
                                    className={cx('btn-cancel')}
                                    primary
                                    onClick={(e) => handleCancel(e)}
                                    type="cancel"
                                >
                                    Cancel
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
            <ConfirmModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => {
                    nav('/me');
                }}
                title="Confirm cancel"
                description="Changes you made may not be saved. Are you sure cancel?"
                cancelText="No"
                confirmText="Yes"
            ></ConfirmModal>
        </>
    );
}

export default Write;
