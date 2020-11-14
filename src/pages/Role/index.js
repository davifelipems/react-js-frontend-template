import React, { Component } from "react"
import Tabs from '../../common/template/tab/tabs'
import TabsContent from '../../common/template/tab/tabsContent'
import TabContent from '../../common/template/tab/tabContent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleList from './roleList'
import {init,showCreate,showUpdate,create,update,
        setSelectedPrivileges,
        setMultiselectPrivileges} from './roleActions'
import Form from './roleForm'
import {setLoading,getList,setTotalPages,setCurrentPage,setOrderBy,setPaginationParams} from '../../common/template/pagination/paginationActions'
import { initialize  } from 'redux-form'

class Role extends Component {
    
    componentDidMount() {
        this.props.init(this.props)
        initialize('RoleFormList',this.props.paginationParams)
    }

    _selectTab(e){
        e.preventDefault()
        this.props.selectTab(this.props.target)
    }

    search(values){

        this.props.getList(this.props,this.props.currentPage,values);
    }

    render() {
        return (
            <Tabs> 
                <TabsContent>
                    <TabContent id='tabList'>
                        <RoleList onSubmit={this.search.bind(this)} />
                    </TabContent>
                    <TabContent id='tabCreate'>
                        <Form onSubmit={this.props.create.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
                              setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                              multiselectPrivileges={this.props.multiselectPrivileges}
                              setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                              submitLabel='Create'
                              submitIcon='plus'
                              submitClass='success' />
                    </TabContent>
                    <TabContent id='tabUpdate'>
                        <Form onSubmit={this.props.update.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
                              setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                              multiselectPrivileges={this.props.multiselectPrivileges}
                              setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                              submitLabel='Update'
                              submitIcon='pencil'
                              submitClass='warning' />
                    </TabContent>
                </TabsContent> 
            </Tabs>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
                                                init,
                                                showCreate,
                                                showUpdate,
                                                create,
                                                update,
                                                setLoading,
                                                setTotalPages,
                                                setCurrentPage,
                                                setOrderBy,
                                                setSelectedPrivileges,
                                                getList,
                                                setPaginationParams,
                                                setMultiselectPrivileges
                                                }, 
                                                dispatch)

const mapStateToProps = state => ({endpoint:'/role/page',
                                   list: state.paginationReducer.list,
                                   paginationParams: state.paginationReducer.paginationParams,
                                   currentPage:state.paginationReducer.currentPage,
                                   totalPages:state.paginationReducer.totalPages,
                                   loading:state.paginationReducer.loading,
                                   selectedPrivileges:state.roleReducer.selectedPrivileges,
                                   multiselectPrivileges: state.roleReducer.multiselectPrivileges})

export default connect(mapStateToProps, mapDispatchToProps)(Role)