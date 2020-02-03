import React, { Component } from 'react'

import ArticleService from '../../services/article-service';
export default class ArticleEdit extends Component {
    state = {titles: []}

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
        console.log(res)
    }
    render() {
        let titles = this.state.titles.map( (title, i) => {
            return <li key={i} onClick={() => this.getArticle(title.id)}>{title.id}, {title.title}</li>
        })
        return (
            <ul>
                {titles}
            </ul>
        )
    }
}
