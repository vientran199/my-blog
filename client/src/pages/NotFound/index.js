import classNames from "classnames/bind";
import styles from './NotFound.module.scss'

import Button from "~/components/Button";

const cx = classNames.bind(styles)

function NotFound() {
    return <div className={cx("container")}>
        <div className={cx("notfound")}>
            <div className={cx("notfound-404")}>
                <h1>Oops!</h1>
            </div>
            <h2>404 - Page not found</h2>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
            <Button to="/" primary rounded>Go To Homepage</Button>
        </div>
    </div >;
}

export default NotFound;