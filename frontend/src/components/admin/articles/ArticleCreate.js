import React, { Component } from 'react'
import './ArticleCreate.css';
import Config from '../../../config';
import TokenService from '../../../services/token-service';
import UploadService from '../../../services/uploader-service';
import SiteContext from '../../../SiteContext';

export default class ArticleCreate extends Component {
    constructor(props){
        super(props);
        this.state = { disableButton: false, feedback: '' };
        this.file = null;
        this.img = new Image();
        this.img.onLoad = this.imgLoadHandler;
        this.img_id = 'article-image';
        this.articleObject = {};
        this.timeOutHandler = null;
    }
    

    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({disableButton: true})
        let { title, description, content, img_url } = e.target;

        if (!title.value || !description.value || !content.value | !img_url.value ) {
            this.setState({feedback: 'please fill out all fields'})
            this.setState({disableButton: false})
            return;
        }

        this.articleObject = {
            title: title.value,
            description: description.value,
            content: content.value
        }
        const fileNames = UploadService.createFileNames(this.articleObject, this.img_id);
        this.articleObject.img_url = fileNames.img_url;

        title.value = '';
        description.value = '';
        content.value = '';
       

        let result = await fetch(`${Config.API_ENDPOINT}/articles/`, {
            method: "POST", 
            body: JSON.stringify(this.articleObject),
            headers: {
                "authorization": `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })

        if (result.ok) {
            let uploadResult = await UploadService.initUpload(this.img_id, fileNames.imageName);
            if (uploadResult) {
                this.photoLoadComplete();
            }
        }
    }
    photoLoadComplete = () => {
        this.setState({disableButton: false, feedback: 'article entered'})
        document.getElementById(this.img_id).value = '';
        clearTimeout(this.timeOutHandler)
        this.timeOutHandler = setTimeout(()=>{this.setState({feedback:''})}, 1000)
        //add the article to the creators obj
        //this.context.addArticle(this.articleObject)
    }
    onChangeHandler = (e) => {
        if(this.state.feedback !== ''){
            this.setState({feedback: ''})
        }
        const { files } = document.getElementById(this.img_id);
        this.file = files[0];
        var url = URL.createObjectURL(this.file);
        this.img.src = url;
        this.imgValue = e.currentTarget.value;
    }
    imgLoadHandler = () => {
        URL.revokeObjectURL(this.file)
        //add size check when ready
    }
    render() {
        return (
            <form id="article-create" onSubmit={this.onSubmitHandler}>
                <h4>create article</h4>
                <div>
                    <input type="text" name="title" placeholder="title" />
                    <input type="text" name="description" placeholder="description" />
                    <textarea name="content" placeholder="article content" />
                    <label htmlFor="article-image">choose image for article</label>
                    <input onChange={this.onChangeHandler} type="file" name="img_url" id="article-image" />
                    <input disabled={ this.state.disableButton } type="submit" />
                    <div className="feedback">{this.state.feedback}</div>
                </div>
            </form>
        )
    }
}
ArticleCreate.contextType = SiteContext;
