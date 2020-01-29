import React, { Component } from 'react';
import SiteContext from '../SiteContext';
import './CreatorPage.css';
import Config from '../config';
export default class CreatorPage extends Component {
    state = {pageData: []}
    componentDidMount () {
        let { author_id } = this.props.match.params;
        this.getCreatorData(author_id);
    }
    getCreatorData = async (author_id) => {
        let res = await fetch(`${Config.API_ENDPOINT}/creators/get-creator-data?id=${author_id}`)
        let resJson = await res.json();
        this.setState({pageData: resJson.creators});
    }
    render () {
        if (!this.state.pageData.length) {
            return <></>;
        }
        let name = this.state.pageData[0].username;
        let avatar = this.state.pageData[0].avatar;
        
        let arts = this.state.pageData.map((a, index) => {
            return (<li 
                onClick={() => this.context.goToArticle(name, a.id)}
                key={index}>
                <h4>{a.title}</h4>
                </li>)
        })
        return (
            <div className="creator-page">
                <img src={avatar} alt="avatar" />
                <h2>{name}</h2>
                <h4>articles: </h4>
                <ul>{arts}</ul>
            </div>
        )
    }
       
}
CreatorPage.contextType = SiteContext