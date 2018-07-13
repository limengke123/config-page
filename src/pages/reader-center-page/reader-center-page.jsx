import React from 'react'
import {connect} from 'react-redux'
import PageHeader from '../../components/page-header'
import PageContent from '../../components/page-content'
import ReaderCenterForm from './reader-center-form'
import ToolBar from '../../components/tool-bar'
import {changeConfig} from '../../actions/reader-center'

class ReaderCenterPage extends React.Component {

    state = {
        fields: {
            ...this.props.readerCenter
        }
    }

    handleFormChange = (changedFields) => {
        const outerKey = Object.keys(changedFields)[0]
        const innerKey = Object.keys(changedFields[outerKey])[0]
        this.setState({
            fields: {
                ...this.state.fields,
                [outerKey]: {
                    ...this.state.fields[outerKey],
                    [innerKey]: changedFields[outerKey][innerKey].value
                }
            }
        })
    }

    handleClick = () => {
        // axios.put('/apps/4', {
        //     name: 'opac2',
        //     show: true
        // }).then(resp => {
        //     console.log(resp)
        // })
        // axios.get('/api')
        //     .then(resp => {
        //         return resp.data
        //     })
        //     .then(data => {
        //         console.log(data)
        //     })
        console.log(this.state.fields)
        const {mergeConfig} = this.props
        mergeConfig(this.state.fields)
    }

    render() {
        return (
            <div>
                <PageHeader>
                    <h1>读者中心</h1>
                    <p style={{marginBottom: 16}}>从如下 App 应用中挑选需要使用的应用，并设置 APP 对应具体配置。</p>
                </PageHeader>
                <PageContent>
                    <ReaderCenterForm onChange={this.handleFormChange} {...this.state.fields} />
                    <ToolBar onClick={this.handleClick}/>
                </PageContent>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    readerCenter: state.readerCenter
})

const mapDispatchToProps = dispatch => ({
    mergeConfig (config) {
        dispatch(changeConfig(config))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReaderCenterPage)



