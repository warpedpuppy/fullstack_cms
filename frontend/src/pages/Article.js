import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Article.css';
import Utils from '../services/utils';
import Sidebar from '../components/articles/Sidebar';
import Config from '../config';
import ArticleBody from '../components/articles/ArticleBody';

export default class Article extends Component {
    constructor (props) {
        super(props);
        let { index, name } = this.props.match.params;
        this.setState({name})
    }
    state = {
        name: '',
        id:'',
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
        if (index !== this.state.article.id) {
            this.forceUpdate()
        }
        this.setState({name})
        let res = await fetch(`${Config.API_ENDPOINT}/articles/article?id=${index}&author=${name}`)
        let resJson = await res.json();
        if (!resJson.success) {
            this.props.history.push('/')
        }
        let obj = Object.assign({}, resJson.result)
        this.setState({article: obj})
        this.setState({id: index})
    }
    doIt () {
        this.setState({id: index}, function(){ this. getArticleData(index, name)})
    }
    render() {
        let { index, name } = this.props.match.params;
        if (index !== this.state.id) {
            this.doIt();
        }
        return (
            <article>
                <ArticleBody {...this.state.article} />
            </article>
        )
       
    }
}
Article.contextType = SiteContext;