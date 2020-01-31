import Config from '../config';
import TokenService from '../services/token-service';
const UploaderService = {
    async initUpload(id, img_name) {
        const { files } = document.getElementById(id);
        const file = files[0];
        if (file === null) return alert('No file selected.');
        const res = await this.getSignedRequest(file, img_name);
        return res;
    },
    async getSignedRequest(file, img_name) {
        const result = await fetch(`${Config.API_ENDPOINT}/photo-uploader/sign-s3?file-name=${Config.IMAGE_DIR}/${img_name}&file-type=${file.type}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        const resultJSON = await result.json();
        const { signedRequest } = resultJSON;
        const uploadResult = await this.uploadFile(file, signedRequest);
        return uploadResult;
    },
    async uploadFile(file, signedRequest) {
        const result = await fetch(signedRequest, {
        method: "PUT",
        headers:  { 'content-type': file.type },
        body: file
        })
        return result.ok;
    },
    createFileNames(obj, string) {
        const titleWithoutSpaces = obj.title.replace(/ /g, '');
        const { files } = document.getElementById(string);
        const imageName = `${titleWithoutSpaces}${files[0].name}`;

        const img_url = Config.IMAGE_ROOT + imageName;
        return { img_url, imageName };
    },
};

export default UploaderService;
