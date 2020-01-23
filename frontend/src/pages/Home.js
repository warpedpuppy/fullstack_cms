import React, { Component } from 'react';
import CreatorService from '../services/creators-service';
import ArticleColumn from '../components/articles/ArticleColumn';
import ArticleModule from '../components/articles/ArticleModule';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Home.css';

class Home extends Component {

    render() {
        let creators = Object.keys(this.context.creators).map( (creator, index) => {
            return <ArticleModule 
            goToArticle={this.goToArticle}
            goToCreator={this.goToCreator}
            title={this.context.creators[creator].articles[0].title}
            creator={creator}
            index={0}
           /> ;
        })
        return (
            <>
            <div className="article-list">
                <ArticleColumn 
                    index={0}
                    startIndex={0}
                    endIndex={2}
                />
                  <ArticleColumn 
                    index={0}
                    startIndex={2}
                    endIndex={5}
                />
                   <ArticleColumn 
                    index={0}
                    startIndex={5}
                    endIndex={8}
                />
                  <ArticleColumn 
                    index={0}
                    startIndex={8}
                />
            </div>
            {/* <hr /><hr /><hr /><hr /><hr /><hr /><hr /><hr />
            <div className="article-list">
               {creators}
            </div> */}
            </>
        )
    }
}
Home.contextType = SiteContext;
export default withRouter(Home);