import React from 'react'
import {Card, Icon, Switch, message} from 'antd'
import {withRouter} from 'react-router-dom'
import Description from './description'
import {axios} from '../util'

const {Meta} = Card

@withRouter
export default class AppCard extends React.Component {

    handleChange = (checked) => {
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
        return (
            <Card
                hoverable={true}
                actions={[<Switch onChange={this.handleChange} checked={data.show}/>, <Icon onClick={() => this.props.history.push(data.type)} type="setting" style={{fontSize: 22}}/>]}
            >
                <Meta
                    avatar={<img src={data.logoSrc} alt={data.title} style={{width: 48, height: 48, borderRadius: 48}}/>}
                    title={data.title}
                    description={<Description text={data.description}/>}
                />
            </Card>
        )
    }
}


