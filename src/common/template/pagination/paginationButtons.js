import React, { Component } from 'react';
import {getList,setTotalPages,setLoading,setCurrentPage} from './paginationActions'
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class PaginationComponent extends Component{

    _nextPage(e){
        e.preventDefault();
        if(this.props.currentPage === (this.props.totalPages -1)){
            return false;
        }
        this.props.getList(this.props,(this.props.currentPage + 1));
    }

    _previousPage(e){
        e.preventDefault();
        if(this.props.currentPage === 0){
            return false;
        }
        this.props.getList(this.props,(this.props.currentPage - 1));
    }

    _firstPage(e){
        e.preventDefault();
        if(this.props.currentPage === 0){
            return false;
        }
        this.props.getList(this.props,0);
    }

    _lastPage(e){
        e.preventDefault();
        if(this.props.currentPage === (this.props.totalPages -1)){
            return false;
        }
        this.props.getList(this.props,(this.props.totalPages -1));
    }

    _goToPage(page,e){
        e.preventDefault();
        this.props.getList(this.props,page);
    }

    renderPreviousButtons(){

        var buttons = [];

        for(var i =2; i >= 0; i--){
            if(this.props.currentPage > i){
                buttons = buttons.concat([
                    <li key={'ant-'+(this.props.currentPage -i)} className="page-item"><a className="page-link" href="/" onClick={this._goToPage.bind(this,(this.props.currentPage - (i +1)))}>{(this.props.currentPage -i)}</a></li>
                ]);
            }
        }

        return buttons;
    }

    renderNextButtons(){

        var buttons = [];

        if(this.props.currentPage === (this.props.totalPages -1)){
            return buttons;
        }

        for(var i =(this.props.currentPage +2); i <= (this.props.currentPage +4); i++){
            if(i < (this.props.totalPages -2)){
                buttons = buttons.concat([
                    <li key={'prox-'+i} className="page-item"><a className="page-link" href="/" onClick={this._goToPage.bind(this,(i - 1))}>{i}</a></li>
                ]);
            }
        }

        return buttons;
    }

    
    render() {
        if(!this.props.totalPages || this.props.totalPages <= 1){
            return (
                ''
            )
        }
        return(
            <nav aria-label="...">
                <ul className="pagination pagination-flat">
                    <li className={"page-item "+(this.props.currentPage < 1 ? 'disabled' : '')}>
                        <a className="page-link" href="/" onClick={this._firstPage.bind(this)}><i className='fa fa-fast-backward'/></a>
                    </li>
                    <li className={"page-item "+(this.props.currentPage === 0 ? 'disabled' : '')}>
                        <a className="page-link" href="/" onClick={this._previousPage.bind(this)}><i className='fa fa-backward'/></a>
                    </li>
                    {this.renderPreviousButtons()}
                    <li className="page-item active">
                        <a className="page-link" href="/" onClick={e =>e.preventDefault()} >
                            {(this.props.currentPage +1)}
                            <span className="sr-only">(atual)</span>
                        </a>
                    </li>
                    {this.renderNextButtons()}
                    <li className={"page-item "+(this.props.currentPage === (this.props.totalPages -1) ? 'disabled' : '')}>
                    <a className="page-link" href='/' onClick={this._nextPage.bind(this)}><i className='fa fa-forward'/></a>
                    </li>
                    <li className={"page-item "+(this.props.currentPage === (this.props.totalPages -1) ? 'disabled' : '')}>
                        <a className="page-link" href="/" onClick={this._lastPage.bind(this)}><i className='fa fa-fast-forward'/></a>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.paginationReducer.loading,
    currentPage: state.paginationReducer.currentPage,
    totalPages:state.paginationReducer.totalPages
 })

const mapDispatchToProps = dispatch => bindActionCreators({
                            getList,
                            setLoading,
                            setTotalPages,
                            setCurrentPage}, dispatch)

const ShowTheLocationWithRouter = withRouter(PaginationComponent)
export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter)