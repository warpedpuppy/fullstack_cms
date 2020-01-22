import React, { Component } from 'react';
import CreatorService from '../services/creators-service';
import ArticleColumn from '../components/articles/ArticleColumn';
import ArticleModule from '../components/articles/ArticleModule';
import { withRouter } from 'react-router-dom';
import SiteContext from '../SiteContext';
import './Home.css';

class Home extends Component {

    goToCreator = (creator) => {
        this.props.history.push(`/creator/${creator}`)
    }
    goToArticle = (creator, index) => {
        this.props.history.push(`/article/${creator}/${index}`)
    }



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
                    goToArticle={this.goToArticle}
                    goToCreator={this.goToCreator}
                    index={0}
                    startIndex={0}
                    endIndex={2}
                />
                  <ArticleColumn 
                    goToArticle={this.goToArticle}
                    goToCreator={this.goToCreator}
                    index={0}
                    startIndex={2}
                    endIndex={5}
                />
                   <ArticleColumn 
                    goToArticle={this.goToArticle}
                    goToCreator={this.goToCreator}
                    index={0}
                    startIndex={5}
                    endIndex={8}
                />
                  {/* <ArticleColumn 
                    goToArticle={this.goToArticle}
                    goToCreator={this.goToCreator}
                    index={0}
                    startIndex={8}
                /> */}
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