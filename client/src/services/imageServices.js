import { storage } from '~/firebase';

export const uploadImage = async (images, setIsLoading) => {
    const promises = [];
    await images.forEach(async (image, index) => {
        if (image && typeof image !== 'string') {
            const promise = new Promise(function (resolve, reject) {
                const fileName =
                    index + '_' + new Date().getTime() + image.name;
                const uploadTask = storage.ref(`images/${fileName}`).put(image);

                uploadTask.on(
                    'state_changed',
                    function (snapshot) {
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        setIsLoading(true);
                        console.log('Upload is ' + progress + '% done');
                    },
                    function error(err) {
                        console.log('error', err);
                        reject();
                    },
                    function complete() {
                        uploadTask.snapshot.ref
                            .getDownloadURL()
                            .then(function (downloadURL) {
                                resolve(downloadURL);
                            });
                    },
                );
            });
            promises.push(promise);
        } else {
            const promise = new Promise((resolve, reject) => {
                return resolve(image);
            });
            promises.push(promise);
        }
    });
    return promises;
};
