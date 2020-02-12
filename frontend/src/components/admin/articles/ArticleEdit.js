import React, { Component } from 'react'
import './ArticleEdit.css';
import ArticleService from '../../../services/article-service';
import UploadService from '../../../services/uploader-service';

export default class ArticleEdit extends Component {
    state = {titles: [], editArticle: {}, storeImgUrl: null, deleteModal: false, formDisable: false, offset: 0}
    articleIncrement = 3;
    componentDidMount(){
        this.getArticleTitles(this.state.offset, this.articleIncrement);
    }
    getArticleTitles = async (offset, increment) => {
        let res = await ArticleService.getArticleTitles(offset, increment);
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
    deleteArticle = async (e) => {
        e.preventDefault(); 
        let res = await ArticleService.deleteArticle(this.state.editArticle.id);

        if (res.success) {
            this.setState({editArticle: {}, deleteModal: false})
            this.getArticleTitles();
        }
    }
    moreEvents = (e) => {
        e.preventDefault();
        let { id } = e.target;
        if (id === 'next-articles') {
            let offset = this.state.offset + this.articleIncrement;
            this.setState({offset})
            this.getArticleTitles(offset, this.articleIncrement)
        } else {
            let offset = this.state.offset - this.articleIncrement;
            this.setState({offset})
            this.getArticleTitles(offset, this.articleIncrement)
        }
        
    }
    onSubmitHandler = async (e) => {
        e.preventDefault();
        this.setState({formDisable: true})
        if (this.state.storeImgUrl === this.state.editArticle.img_url) {
            let res = await ArticleService.submitEditedArticle(this.state.editArticle);
            if (res.success) {
                this.setState({editArticle: {}, storeImgUrl: null, formDisable: false})
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
                    this.setState({editArticle: {}, storeImgUrl: null, formDisable: false})
                    this.getArticleTitles();
                }
            }
        }

       
    }
    render() {
        let titles = this.state.titles.map( (title, i) => {
            return <li key={i} onClick={() => this.getArticle(title.id)}>{title.title}</li>
        })
        if (!Object.keys(this.state.editArticle).length) {
            let articleText = `articles ${this.state.offset} to ${this.state.offset + this.articleIncrement}`
            return ( 
            <>
            <h2>choose articles to edit: </h2>
            <div className="edit-titles-buttons">
                    <button 
                    onClick={this.moreEvents} 
                    id="prev-articles"
                    disabled={this.state.offset === 0}
                    >prev {this.articleIncrement}</button>
                    {articleText}
                    <button 
                    onClick={this.moreEvents} 
                    id="next-articles"
                    disabled={titles.length < this.articleIncrement && this.state.offset !== 0}
                    >next {this.articleIncrement}</button>
                 </div>
            <ul className="edit-titles">{titles}</ul>
                </> )
        } else {
            let {title, description, content } = this.state.editArticle;
            return (
                <div className="edit-article-shell">
                <div className='edit-article-form-cont'>
                
                    
                <form id="article-edit" onSubmit={this.onSubmitHandler}>
                <span className="close-button" onClick={() => this.setState({editArticle: {}})}>&times;</span>
                <button onClick={(e) => {e.preventDefault(); this.setState({deleteModal: true})}}>delete article</button>
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
                        <input type="submit" disabled={this.state.formDisable} />
                    </div>
                </form>
                <div className={`cover ${this.state.deleteModal? 'show' : 'hide'}`}>
                    <button onClick={(e) => {e.preventDefault(); this.setState({deleteModal: false})}}>cancel delete</button>
                    <button onClick={ this.deleteArticle }>confirm delete</button>
                </div>
                </div>
                </div>
            )
        }
        
    }
}
