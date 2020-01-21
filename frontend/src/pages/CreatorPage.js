import React, { Component } from 'react'
import SiteContext from '../SiteContext'

export default class CreatorPage extends Component {
    componentDidMount () {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
        }
    }
    render () {
        if (!this.context.creators[this.props.match.params.name]) {
            this.props.history.push('/')
        } else {
            console.log(this.context.creators[this.props.match.params.name])
        }
        return (
            <div>
                <img src={this.context.creators[this.props.match.params.name].img_url} />
                Hello {this.props.match.params.name}!
            </div>
        )
     
       
    }
}
CreatorPage.contextType = SiteContext