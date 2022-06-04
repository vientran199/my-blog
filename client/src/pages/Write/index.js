import {
    faCirclePlus,
    faPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';

import ImageInput from '~/components/ImageInput';
import TextInput from '~/components/TextInput';
import styles from './Write.module.scss';

const cx = classNames.bind(styles);

function Write() {
    const [valueForm, setValueForm] = useState({
        title: '',
        imageCover: '',
        description: '',
        images: [],
    });
    const [paragraph, setParagraph] = useState([
        {
            image: '',
            description: '',
        },
    ]);

    const handleChangeParagrph = (e, index) => {
        let f = null;
        const isFile = e.target.files;
        if (isFile) {
            f = e.target.files[0];
            console.log(f);
            f = URL.createObjectURL(f);
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
    const handleAddRow = () => {
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
            f = URL.createObjectURL(f);
        }
        setValueForm({
            ...valueForm,
            [e.target.name]: isFile ? f : e.target.value,
        });
    };

    const handleSubmit = () => {
        const valuePost = { ...valueForm, images: [...paragraph] };

        console.log(valuePost);
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
                    onClick={handleAddRow}
                >
                    Add more picture
                </Button>

                <Button
                    className={cx('publish')}
                    primary
                    onClick={handleSubmit}
                >
                    Publish
                </Button>
            </div>
        </div>
    );
}

export default Write;
