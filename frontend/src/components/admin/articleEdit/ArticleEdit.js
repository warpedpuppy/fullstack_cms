import React, { Component } from 'react'
import './ArticleEdit.css';
import ArticleService from '../../../services/article-service';
import UploadService from '../../../services/uploader-service';
import ArticleEditForm from './ArticleEditForm';

export default class ArticleEdit extends Component {
    state = {titles: [], editArticle: {}, storeImgUrl: null}

    componentDidMount(){
        this.getArticleTitles();
    }
    getArticleTitles = async () => {
        let res = await ArticleService.getArticleTitles();
        if (res.success) {
            this.setState({titles: res.result})
        }
    }
    getArticle = async (id) => {
        let res = await ArticleService.getArticleForEdit(id) 
        this.setState({editArticle: res.result, storeImgUrl: res.result.img_url})
    }
    onChangeHandler = (e) => {
        let newObj = {};
        newObj[e.target.name] = e.target.value;
        let editArticle = Object.assign({}, this.state.editArticle, newObj)
        if (e.target.name === 'img_url') {
            this.setState({editArticle})
        } else {
            this.setState({editArticle})
        }
        
    }
    onSubmitHandler = async (e) => {
        e.preventDefault();
        if (this.state.storeImgUrl === this.state.editArticle.img_url) {
            let res = await ArticleService.submitEditedArticle(this.state.editArticle);
            if (res.success) {
                this.setState({editArticle: {}, storeImgUrl: null})
                this.getArticleTitles();
            }
        } else {

            //upload new image
            let photoName =  UploadService.createFileNames(this.state.editArticle, 'edit-article-image')
            let res = await UploadService.initUpload('edit-article-image', photoName.imageName);
            //then 
            if (res) {

                let objForUpload = Object.assign({}, this.state.editArticle, {img_url: photoName.img_url})
                let res2 = await ArticleService.submitEditedArticle(objForUpload);
                if (res2.success) {
                    this.setState({editArticle: {}, storeImgUrl: null})
                }
            }
        }

       
    }
    render() {
        let titles = this.state.titles.map( (title, i) => {
            return <li key={i} onClick={() => this.getArticle(title.id)}>{title.title}</li>
        })
        if (!Object.keys(this.state.editArticle).length) {
            return ( <><h2>choose articles to edit: </h2><ul>{titles}</ul></> )
        } else {
            let {title, description, content, img_url} = this.state.editArticle;
            return (
                <div className='edit-article-form-cont'>
                    <span className="close-button" onClick={() => this.setState({editArticle: {}})}>&times;</span>
                <form id="article-edit" onSubmit={this.onSubmitHandler}>
                    <h4>edit article</h4>
                    <div>
                        <label htmlFor="title">title: </label>
                        <input onChange={this.onChangeHandler} type="text" name="title" id="title" value={title} />
                    </div>
                    <div>
                        <label htmlFor="description">description: </label>
                        <input onChange={this.onChangeHandler} type="text" name="description" id="description" value={description} />
                    </div>
                    <div>
                        <label htmlFor="content">content: </label>
                        <textarea onChange={this.onChangeHandler} name="content" value={content} />
                    </div>
                    <div>
                        <img alt={title} src={this.state.storeImgUrl} />
                        <label htmlFor="edit-article-image">change image?</label>
                        <input  onChange={this.onChangeHandler} name="img_url" type="file" id="edit-article-image" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                </div>
             
            )
        }
        
    }
}
