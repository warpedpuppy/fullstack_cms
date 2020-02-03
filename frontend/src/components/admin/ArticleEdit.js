import React, { Component } from 'react'

import ArticleService from '../../services/article-service';
export default class ArticleEdit extends Component {
    state = {titles: [], editArticle: {}}

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
        console.log(ArticleService)
        let res = await ArticleService.getArticleForEdit(id) 
        console.log(res.result[0]);
        this.setState({editArticle: res.result[0]})
    }
    render() {
        let titles = this.state.titles.map( (title, i) => {
            return <li key={i} onClick={() => this.getArticle(title.id)}>{title.id}, {title.title}</li>
        })
        if (!Object.keys(this.state.editArticle).length) {
            return ( <ul>{titles}</ul> )
        } else {
            return (
                <div className='edit-article-form-cont'>
                <form>
                    <h4>edit article</h4>
                </form>
                </div>
             
            )
        }
        
    }
}
