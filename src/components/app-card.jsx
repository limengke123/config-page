import React from 'react'
import {Card, Icon, Avatar, Switch, message} from 'antd'
import {withRouter} from 'react-router-dom'
import {axios} from '../util'

const {Meta} = Card

@withRouter
export default class AppCard extends React.Component {

    handleChange = (checked) => {
        console.log(checked)
        axios.post('/api/saveConfig', {
            type: 'basicConfig',
            data: {
                [this.props.data.type]: {
                    basicConfig: {
                        show: checked
                    }
                }
            }
        }).then(resp => {
            console.log(resp)
            // console.log(this.props)
            if (resp.data && resp.data.success === true) {
                message.success('修改成功!')
                this.props.data.handleShow(this.props.data.type, checked)
            } else {
                message.error('修改失败,稍后重试')
            }
        })
    }

    render () {
        const {data} = this.props
        console.log(data.show)
        return (
            <Card
                actions={[<Switch onChange={this.handleChange} checked={data.show}/>, <Icon onClick={() => this.props.history.push(data.name)} type="setting" style={{fontSize: 22}}/>]}
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


