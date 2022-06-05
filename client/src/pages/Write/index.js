import {
    faCirclePlus,
    faLock,
    faPlus,
    faUnlock,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';

import ImageInput from '~/components/ImageInput';
import TextInput from '~/components/TextInput';
import styles from './Write.module.scss';
import * as postService from '~/services/postServices'

const cx = classNames.bind(styles);

function Write() {
    const [valueForm, setValueForm] = useState({
        title: '',
        imageCover: null,
        description: '',
        images: [],
        status: 'true'
    });
    const [paragraph, setParagraph] = useState([
        {
            image: null,
            description: '',
        },
    ]);

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
        e.preventDefault()
        let temp = paragraph;
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const valuePost = { ...valueForm, images: [...paragraph] };
        const formData = new FormData()

        formData.append('imageCover', valuePost.imageCover)
        formData.append('title', valuePost.title)
        formData.append('description', valuePost.description)
        formData.append('status', valuePost.status)
        formData.append('image', valuePost.images[0].image)
        formData.append('description1', valuePost.images[0].description)


        const response = await postService.create(formData)

        console.log(response);
        if (response.success) {
            alert(response.message)
        } else {
            alert(response.message)
        }
    };
    const renderMoreImage = () => {
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
                    multiple
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
    };
    return (
        <div className={cx('content')}>
            <div className={cx('heading')}>
                <h3 className={cx('heading-title')}>Write blog</h3>
                <p className={cx('description')}>
                    Write a blog to save memories you remember ^^
                </p>
            </div>
            <form encType='multipart-form-data'>
                <div className={cx('form-blog')}>
                    <ImageInput
                        className={cx('mb', 'image-cover')}
                        title={'Drop image cover'}
                        name="imageCover"
                        value={valueForm.imageCover}
                        onChange={handleChangeForm}
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
                    />
                    {renderMoreImage()}
                    <Button
                        className={cx('mb', 'btn-add-more')}
                        leftIcon={<FontAwesomeIcon icon={faPlus} />}
                        rounded
                        outline
                        small
                        onClick={e => handleAddRow(e)}
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
                    <Button
                        className={cx('publish')}
                        primary
                        onClick={e => handleSubmit(e)}
                        type='submit'
                    >
                        Publish
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Write;
