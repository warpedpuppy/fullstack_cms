import React, { Component } from 'react'
import ArticleModule from './ArticleModule';
import SiteContext from '../../SiteContext';
import './ArticleColumn.css';

export default class ArticleColumn extends Component {
    render() {
        let {startIndex, endIndex} = this.props;
        
        let keys = Object.keys(this.context.creators);
        endIndex = (!endIndex)?keys.length:endIndex;

        let modules = [];
        for (let i = startIndex; i < endIndex; i ++) {
            if(!keys.length)break;
            let { articles } = this.context.creators[keys[i]];
            if (articles) {
                  modules.push( 
                    <ArticleModule 
                        key={i}
                        goToArticle={this.context.goToArticle}
                        goToCreator={this.context.goToCreator}
                        title={articles[this.props.index].title}
                        creator={keys[i]}
                        index={this.props.index}
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
