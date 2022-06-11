import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react'
import classNames from 'classnames';
import styles from './Image.module.scss'
import images from '~/assets/images';

const Image = forwardRef(({ src, alt, classnames, fallBack = images.noImages, ...props }, ref) => {
    const [_fallBack, setFallBack] = useState('')

    const handleError = () => {
        setFallBack(fallBack)
    }
    return (
        <img
            className={classNames(styles.wrapper, classnames)}
            src={_fallBack || src}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
})

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallback: PropTypes.string,
};

export default Image;