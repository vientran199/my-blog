export const stringToUnicode = (str) => {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s/g, '');
};

export const formatDate = (d) => {
    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const milisecon = Date.parse(d);
    const date = new Date(milisecon);
    const mdy = date.toLocaleDateString();
    const hmsmdy = `${date.toLocaleTimeString()}  ${date.toLocaleDateString()}`;
    const day = date.getDate() + 1;
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear() + 1;
    return {
        hmsmdy,
        mdy,
        day,
        month,
        year,
    };
};

export const isEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const getUrlImage = (url) => {
    const baseUrl =
        process.env.NODE_ENV !== 'production'
            ? 'http://localhost:5000/'
            : 'https://myblogapiserver.herokuapp.com/';
    const newUrl = `${baseUrl}${url.slice(11).replace('\\', '/')}`;
    return newUrl;
};
