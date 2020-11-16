import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import Content from '../../common/template/content'
import PaginationButtons from '../../common/template/pagination/paginationButtons'
import {renderArrowDirection,toggleOrderBy} from '../../common/template/pagination/paginationUtils'
import {getList,setTotalPages,setLoading,
        setCurrentPage,setOrderBy,setPaginationParams} from '../../common/template/pagination/paginationActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Row from '../../common/template/gridRow'
import Col from '../../common/template/gridCol'
import 'react-confirm-alert/src/react-confirm-alert.css'
import {remove,showUpdate,showCreate} from './roleActions'
import { selectTab } from '../../common/template/tab/tabActions'
import { reduxForm, Field } from 'redux-form'
import GridAndInput from '../../common/form/GridAndInput'
import {confirmAlertCustom} from '../../common/template/confirmAlert'
import {formValueSelector} from 'redux-form'

class RoleList extends Component {
    
    componentDidMount(){
        this.props.getList(this.props,0,{"name":this.props.nameSearch});
    }

    confirmDelete(id){
        confirmAlertCustom(this.deleteIt.bind(this,id),
                           'You want to delete this record?',
                           'Yes, Delete it!');
    }

    deleteIt(id,closeConfirm){
        this.props.remove(this.props,id);
        closeConfirm();
    }

    renderRows() {

        const list = this.props.list || []
        if(!list.content){
            return  (<tr key='1'>
                        <td colSpan='4'>
                            no results
                        </td>
                    </tr>)
        }
        
        return list.content.map(row => (
            <tr key={row.id}>
                <td onClick={this.props.showUpdate.bind(this,row.id,this.props)}>
                    {(row != null ? row.id : '')}
                </td>
                <td onClick={this.props.showUpdate.bind(this,row.id,this.props)}>
                    {row != null ? row.name : ''}
                </td>
                <td>
                <button className='btn btn-warning btn-flat btn-xs' onClick={this.props.showUpdate.bind(this,row.id,this.props)}>
                    <i className='fa fa-pencil'></i>
                </button>    
                <button className='btn btn-danger btn-flat btn-xs' onClick={this.confirmDelete.bind(this,row.id)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <Content title='Role' loading={this.props.loading} >
                    <form onSubmit={handleSubmit.bind(this)}>
                        <Row>
                            <Field name='name' component={GridAndInput} 
                            label='Nome' cols='12 4' placeholder='name' />

                            <Col cols='6 2'>
                                <button type='submit' className='btn btn-primary btn-flat' >
                                <i className='fa fa-search'/> Search
                                </button>
                            </Col>
                            <Col cols='6 2'>
                                <button type='button'
                                        onClick={this.props.showCreate.bind(this)}
                                        className='btn btn-success btn-flat' >
                                    <i className='fa fa-plus'/> Create 
                                </button>
                            </Col>
                        </Row>
                    </form>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                                <th onClick={toggleOrderBy.bind(this,this.props,"id")}>
                                    id {renderArrowDirection(this.props,'id')}
                                </th>
                                <th onClick={toggleOrderBy.bind(this,this.props,"name")}>
                                    name {renderArrowDirection(this.props,'name')}
                                </th>
                                <th className='table-actions'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                    <PaginationButtons 
                        endpoint={this.props.endpoint}
                        listActionType={this.props.listActionType}
                        paginationParams={this.props.paginationParams}
                        setPaginationParams={this.props.setPaginationParams}
                    />
            </Content>
        );
    }
}

const selector = formValueSelector('RoleFormList')
const mapStateToProps = state => ({endpoint:'/role/page',
                                   list: state.paginationReducer.list,
                                   paginationParams: state.paginationReducer.paginationParams,
                                   currentPage:state.paginationReducer.currentPage,
                                   totalPages:state.paginationReducer.totalPages,
                                   loading:state.paginationReducer.loading,
                                   nameSearch:selector(state, 'name')})

const mapDispatchToProps = dispatch => bindActionCreators({getList,
                            setLoading,
                            setTotalPages,
                            setCurrentPage,
                            setOrderBy,
                            setPaginationParams,
                            remove,
                            showUpdate,
                            showCreate,    
                            selectTab}, dispatch)

RoleList = reduxForm({ form: 'RoleFormList', destroyOnUnmount: false })(RoleList)

const ShowTheLocationWithRouter = withRouter(RoleList)
export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter)