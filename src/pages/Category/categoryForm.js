import React, { Component } from 'react'
import LabelAndInput from '../../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { init} from './categoryActions'
import If from '../../common/operator/if'
import Grid from '../../common/template/gridCol'

class CategoryForm extends Component {


    render() {

        const { handleSubmit, readOnly, loading } = this.props
        return (
            <form onSubmit={handleSubmit.bind(this)} className='box box-primary'>
                <If test={loading} >
                    <div className="overlay">
                        <i className="fa fa-refresh fa-spin"></i>
                    </div>
                </If>
                <div className='box-body'>
                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.submitLabel} Category</h3>
                    </div>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='name' />
                </div>
                <div className='box-footer'>
                    <Grid cols='6 4'>
                        <button type='button' 
                                className='btn btn-default btn-flat'
                                onClick={this.props.init.bind(this,'tabList')}>
                            <i className='fa fa-undo'/> Cancel
                        </button>
                    </Grid>
                    <Grid cols='6 4'>
                        <button type='submit' className={`btn btn-${this.props.submitClass} btn-flat`}>
                        <i className={`fa fa-${this.props.submitIcon}`}/> {this.props.submitLabel} 
                        </button>
                    </Grid>
                </div>
            </form>
        )
    }
}

CategoryForm = reduxForm({ form: 'CategoryForm', destroyOnUnmount: false })(CategoryForm)

const mapDispatchToProps = dispatch => bindActionCreators({
    init
}, dispatch)

const mapStateToProps = state => ({})
export default connect(mapStateToProps,mapDispatchToProps)(CategoryForm)