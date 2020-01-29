import React, { Component } from 'react'
import './ArticleModule.css';

export default class ArticleModule extends Component {
    render() {
        let { creator, index, title, img_url, author_id } = this.props;
        return (
            <div className="article-module">
                <div className="img-cont">
                    <img onClick={() => this.props.goToArticle(creator, index)} src={ img_url } alt="title" />
               </div>
               <div className="module-content">
                    <h4 onClick={() => this.props.goToArticle(creator, index)}>{ title }</h4>
                    <h6>{ title }</h6>
                    <span>by&nbsp;
                        <span 
                            onClick={() => this.props.goToCreator(author_id)}
                            className="author-link">
                            { creator }
                        </span>
                    </span>
               </div>
            </div>
        )
    }
}
