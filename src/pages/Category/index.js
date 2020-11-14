import React, { Component } from "react"
import Tabs from '../../common/template/tab/tabs'
import TabsContent from '../../common/template/tab/tabsContent'
import TabContent from '../../common/template/tab/tabContent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CategoryList from './categoryList'
import {init,showCreate,showUpdate,create,update} from './categoryActions'
import Form from './categoryForm'
import {setLoading,getList,setTotalPages,setCurrentPage,setOrderBy,setPaginationParams} from '../../common/template/pagination/paginationActions'
import { initialize  } from 'redux-form'

class Category extends Component {
    
    componentDidMount() {
        this.props.init(this.props)
        initialize('CategoryFormList',this.props.paginationParams)
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
                        <CategoryList onSubmit={this.search.bind(this)} />
                    </TabContent>
                    <TabContent id='tabCreate'>
                        <Form onSubmit={this.props.create.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
                              submitLabel='Create'
                              submitIcon='plus'
                              submitClass='success' />
                    </TabContent>
                    <TabContent id='tabUpdate'>
                        <Form onSubmit={this.props.update.bind(this,this.props)}
                              loading={this.props.loading}
                              history={this.props.history}
                              setLoading={this.props.setLoading.bind(this)}
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
                                                getList,
                                                setPaginationParams
                                                }, 
                                                dispatch)

const mapStateToProps = state => ({endpoint:'/category/page',
                                   list: state.paginationReducer.list,
                                   paginationParams: state.paginationReducer.paginationParams,
                                   currentPage:state.paginationReducer.currentPage,
                                   totalPages:state.paginationReducer.totalPages,
                                   loading:state.paginationReducer.loading})

export default connect(mapStateToProps, mapDispatchToProps)(Category)