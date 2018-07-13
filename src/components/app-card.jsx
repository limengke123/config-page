import React from 'react'
import {Card, Icon, Avatar, Switch} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {toggleAppShow} from '../actions/base-info'

const {Meta} = Card

const mapDispatchToProps = dispatch => ({
    toggleAppShow: (payload) => dispatch(toggleAppShow(payload))
})

@withRouter @connect(null, mapDispatchToProps)
export default class AppCard extends React.Component {

    handleChange = (checked) => {
        const {data, toggleAppShow} = this.props
        toggleAppShow({
            name: data.name,
            isShow: checked
        })
    }

    render () {
        const {data} = this.props
        return (
            <Card
                actions={[<Switch onChange={this.handleChange} defaultChecked={data.show}/>, <Icon onClick={() => this.props.history.push(data.name)} type="setting" style={{fontSize: 22}}/>]}
            >
                <Meta
                    avatar={<Avatar src={data.logoSrc} size={'large'}/>}
                    title={data.title}
                    description="This is the description"
                />
            </Card>
        )
    }
}


