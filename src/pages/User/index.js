import React, { Component } from "react"
import Tabs from '../../common/template/tab/tabs'
import TabsContent from '../../common/template/tab/tabsContent'
import TabContent from '../../common/template/tab/tabContent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserList from './userList'
import {init,showCreate,showUpdate,create,update,
        setSelectedPrivileges,setSelectedRoles,
        setMultiselectPrivileges,setMultiselectRoles} from './userActions'
import Form from './userForm'
import {setLoading,getList,setTotalPages,setCurrentPage,setOrderBy,setPaginationParams} from '../../common/template/pagination/paginationActions'
import { initialize  } from 'redux-form'

class User extends Component {
    
    componentDidMount() {
        this.props.init(this.props)
        initialize('UserFormList',this.props.paginationParams)
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
                        <UserList onSubmit={this.search.bind(this)}
                                  setPaginationParams={this.props.setPaginationParams.bind(this)} />
                    </TabContent>
                    <TabContent id='tabCreate'>
                        <Form onSubmit={this.props.create.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
                              setSelectedRoles={this.props.setSelectedRoles.bind(this)}
                              setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                              multiselectRoles={this.props.multiselectRoles}
                              multiselectPrivileges={this.props.multiselectPrivileges}
                              setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                              setMultiselectRoles={this.props.setMultiselectRoles.bind(this)}
                              submitLabel='Create'
                              submitIcon='plus'
                              submitClass='success' />
                    </TabContent>
                    <TabContent id='tabUpdate'>
                        <Form onSubmit={this.props.update.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
                              setSelectedRoles={this.props.setSelectedRoles.bind(this)}
                              setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                              multiselectRoles={this.props.multiselectRoles}
                              multiselectPrivileges={this.props.multiselectPrivileges}
                              setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                              setMultiselectRoles={this.props.setMultiselectRoles.bind(this)}
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
                                                setSelectedRoles,
                                                getList,
                                                setPaginationParams,
                                                setMultiselectPrivileges,
                                                setMultiselectRoles 
                                                }, 
                                                dispatch)

const mapStateToProps = state => ({endpoint:'/user/page',
                                   list: state.paginationReducer.list,
                                   paginationParams: state.paginationReducer.paginationParams,
                                   currentPage:state.paginationReducer.currentPage,
                                   totalPages:state.paginationReducer.totalPages,
                                   loading:state.paginationReducer.loading,
                                   selectedRoles:state.userReducer.selectedRoles,
                                   selectedPrivileges:state.userReducer.selectedPrivileges,
                                   multiselectRoles: state.userReducer.multiselectRoles,
                                   multiselectPrivileges: state.userReducer.multiselectPrivileges})

export default connect(mapStateToProps, mapDispatchToProps)(User)