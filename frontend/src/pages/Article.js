import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Article.css';
import Utils from '../services/utils';
import Sidebar from '../components/articles/Sidebar';
import Config from '../config';

export default class Article extends Component {
    constructor (props) {
        super(props);
        
        let { index, name } = this.props.match.params;
        console.log("boom", index, name);
        this.setState({name})
    }
    state = {
        name: '',
        article: {
            id: '',
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
        
        this.setState({name})
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article?id=${index}&author=${name}`)
        let resJson = await res.json();
        if (!resJson.success) {
            this.props.history.push('/')
        }
        console.log(resJson.result[0]);
        let obj = Object.assign({}, resJson.result, {id: index})
        console.log(obj)
        this.setState({article: obj})
    }
    render() {
        let { index, name } = this.props.match.params;
        console.log(index, this.state.article.id)
        if (index !== this.state.article.id) {
            // let { index, name } = this.props.match.params;
            // this.getArticleData(index, name);
            //this.props.history.push(`/article/${name}/${index}`)
        }
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
                        <span onClick={() => this.context.goToCreator(author_id)}>{username}</span> | {Utils.formatDate(date_created)} </div>
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