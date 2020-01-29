import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Article.css';
import Utils from '../services/utils';
import Sidebar from '../components/articles/Sidebar';
import Config from '../config';
export default class Article extends Component {
    state = {
        article: {
            title: '',
            content: '',
            description: '',
            date_created: '',
            img_url: '',
            username: '',
            author_id: ''
        }}

    componentDidMount () {
        let { index, name } = this.props.match.params;
        this.getArticleData(index, name);
    }
    getArticleData = async (index, name) => {
        console.log(index, name)
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article?id=${index}&author=${name}`)
        let resJson = await res.json();
        console.log(resJson.result)
        if(!resJson.success){
            this.props.history.push('/')
        }
        let obj = Object.assign({}, resJson.result[0])
        this.setState({article: obj})
    }
    render() {

        let { 
            title, 
            description, 
            date_created, 
            img_url, 
            username, 
            author_id,
            content
        } = this.state.article;
            return (
                <article>

                    <div className="article-header">
                        <h1>{title}</h1>
                        <div className="article-summary">{description}</div>
                        <div className="article-author">by&nbsp; 
                        <span onClick={() => this.goToCreator(author_id)}>{username}</span> | {Utils.formatDate(date_created)} </div>
                    </div>

                    <div className="article-body">
                        <div className="article-main">
                            <div className="img-cont">
                                <img src={ img_url } alt="title" />
                            </div>
                        
                            <div>
                                <p>{ content }</p>
                            </div>
                        </div>
                        <Sidebar />
                    </div>
                    

                </article>
            )
       
    }
}
Article.contextType = SiteContext;