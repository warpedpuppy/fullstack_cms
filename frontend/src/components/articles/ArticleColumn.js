import React, { Component } from 'react'
import ArticleModule from './ArticleModule';
import SiteContext from '../../SiteContext';
import './ArticleColumn.css';

export default class ArticleColumn extends Component {
    render() {
        let {startIndex, endIndex} = this.props;
        
        endIndex = (!endIndex)?this.context.articles.length:endIndex;

        let modules = [];

        for (let i = startIndex; i < endIndex; i ++) {
            if(!this.context.articles.length)break;
            let articles  = this.context.articles;
            if (articles) {
                  modules.push( 
                    <ArticleModule 
                        key={i}
                        goToArticle={this.context.goToArticle}
                        goToCreator={this.context.goToCreator}
                        title={articles[i].title}
                        img_url={articles[i].img_url}
                        creator={articles[i].username}
                        author_id={articles[i].author_id}
                        index={articles[i].id}
                    /> 
                  )
                }
        }
        
        return (
            <div className="article-column">
                { modules }
            </div>
        )
    }
}
ArticleColumn.contextType = SiteContext;
