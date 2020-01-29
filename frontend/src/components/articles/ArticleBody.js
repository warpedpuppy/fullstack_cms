import React from 'react'
import Sidebar from './Sidebar';
import Utils from '../../services/utils';
import Config from '../../config';
export default class ArticleBody extends React.Component {

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

    render () {
        return (
            <>
            <h1>{this.props.index}</h1>
            <div className="article-header">
                <h1>{this.props.title}</h1>
                <div className="article-summary">
                    {this.props.description}</div>
                <div className="article-author">by&nbsp;
                    <span onClick={
                        () => this.context.goToCreator(this.props.author_id)
                    }>
                        {this.props.username}</span>
                    | {
                    Utils.formatDate(this.props.date_created)
                } </div>
            </div>
    
            <div className="article-body">
                <div className="article-main">
                    <div className="img-cont">
                        <img src={this.props.img_url}
                            alt="title"/>
                    </div>
                    <div>
                        <p>{this.props.content}</p>
                    </div>
                </div>
                <Sidebar/>
            </div>
            </>
        )
    }
   
}
