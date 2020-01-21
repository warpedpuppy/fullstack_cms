import React, { Component } from 'react'
import SiteContext from '../SiteContext'

export default class CreatorPage extends Component {
   
    render () {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
            return (<></>)
        } else {
        let { img_url, articles } = this.context.creators[this.props.match.params.name];
        let arts = articles.map((a, index) => {
            return (
                <div key={index}>
                    <img src="/bmps/IMG_7548.jpeg" />
                    <h4>{a.title}</h4>
                    <date>{a.date_created}</date>
                    <pre>{a.content}</pre>
                </div>)
        })
        return (
            <div>
                <img src={img_url} alt="avatar" />
                Hello {this.props.match.params.name}!
                {arts}
            </div>
        )
    }
       
    }
}
CreatorPage.contextType = SiteContext