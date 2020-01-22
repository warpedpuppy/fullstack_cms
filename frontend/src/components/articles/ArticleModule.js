import React, { Component } from 'react'
import './ArticleModule.css';

export default class ArticleModule extends Component {
    render() {
        return (
            <div className="article-module">
                <div className="img-cont">
                    <img onClick={() => this.props.goToArticle(this.props.creator, 0)} src="/bmps/IMG_7548.jpeg" alt="title" />
               </div>
               <div>
                <h4 onClick={() => this.props.goToArticle(this.props.creator, 0)}>{ this.props.title }</h4>
                <h6 onClick={() => this.props.goToArticle(this.props.creator, 0)}>{ this.props.title }</h6>
                <span>by&nbsp;
                    <span 
                        onClick={() => this.props.goToCreator(this.props.creator)}
                        className="author-link">
                        { this.props.creator }
                    </span>
                </span>
               </div>
            </div>
        )
    }
}
