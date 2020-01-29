import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './Article.css';
import Config from '../config';
import ArticleBody from '../components/articles/ArticleBody';

export default class Article extends Component {
    constructor (props) {
        super(props);
        console.log('article constructor')
       // let { index, name } = this.props.match.params;
       // this.setState({name, id: index})
    }
    state = {
        mounted: false,
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
        this.setState({mounted:true, id: index})
    }
    componentDidUpdate () {
        let { index, name } = this.props.match.params;
        if (index !== this.state.id) {
            this.getArticleData(index, name)
            this.setState({id: index})
        } 
    }

    getArticleData = async (index, name) => {
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

    render() {
        let { index } = this.props.match.params;
        return (
            <article>
                <ArticleBody index={index} {...this.state.article} />
            </article>
        )
       
    }
}
Article.contextType = SiteContext;