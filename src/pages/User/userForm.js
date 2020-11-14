import React, { Component } from 'react'
import LabelAndInput from './../../common/form/labelAndInput'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { init, setSelectedRoles, setSelectedPrivileges, loadListPrivileges, loadListRoles } from './userActions'
import If from '../../common/operator/if'
import { Multiselect } from 'multiselect-react-dropdown'
import Grid from '../../common/template/gridCol'

class UserForm extends Component {

    constructor(props) {
        super(props)
        props.loadListRoles(props)
        props.loadListPrivileges(props)
    }

    componentDidMount() {
        this.props.setMultiselectPrivileges(this.props.multiselectPrivileges)
        this.props.setMultiselectRoles(this.props.multiselectRoles)
    }

    changePrivilege(selectedList, selectedItem) {
        this.props.setSelectedPrivileges(selectedList)
    }

    changeRole(selectedList, selectedItem) {
        this.props.setSelectedRoles(selectedList)
    }

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
                        <h3 className="box-title">{this.props.submitLabel} User</h3>
                    </div>
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='name' />
                    <Field name='email' component={LabelAndInput} readOnly={readOnly}
                        label='Email' type='email' cols='12 4' placeholder='e-mail' />
                    <Field name='password' component={LabelAndInput} readOnly={readOnly}
                        label='Password' type='password' cols='12 4' placeholder='password' />
                    <Field name='password_confirm' component={LabelAndInput} readOnly={readOnly}
                        label='Password confirm' type='password' cols='12 4' placeholder='password confirm' />
                    <Grid cols='12 12'>
                        <div className='form-group'>
                            <label>Roles</label>
                            <Multiselect
                                ref={this.props.multiselectRoles}
                                placeholder='Roles'
                                options={this.props.listRoles} // Options to display in the dropdown
                                selectedValues={this.props.selectedRoles} // Preselected value to persist in dropdown
                                onRemove={this.changeRole.bind(this)}
                                onSelect={this.changeRole.bind(this)} // Function will trigger on select event
                                displayValue="pritty_name" // Property name to display in the dropdown options
                                id='roles'
                            />
                        </div>
                    </Grid>
                    <Grid cols='12 12'>
                        <div className='form-group'>
                            <label>Privileges</label>
                            <Multiselect
                                ref={this.props.multiselectPrivileges}
                                placeholder='Privileges'
                                options={this.props.listPrivileges} // Options to display in the dropdown
                                selectedValues={this.props.selectedPrivileges} // Preselected value to persist in dropdown
                                onSelect={this.changePrivilege.bind(this)} // Function will trigger on select event
                                onRemove={this.changePrivilege.bind(this)}
                                displayValue="pritty_name" // Property name to display in the dropdown options
                                id='privileges'
                            />
                        </div>
                    </Grid>
                </div>
                <div className='box-footer'>
                    <Grid cols='6 4'>
                        <button type='button' 
                                className='btn btn-default btn-flat'
                                onClick={this.props.init.bind(this, this.props)}>
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

UserForm = reduxForm({ form: 'UserForm', destroyOnUnmount: false })(UserForm)

const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    setSelectedPrivileges,
    loadListPrivileges,
    loadListRoles,
    setSelectedRoles
}, dispatch)
const mapStateToProps = state => ({
    selectedRoles: state.userReducer.selectedRoles,
    listRoles: state.userReducer.listRoles,
    listPrivileges: state.userReducer.listPrivileges,
    selectedPrivileges: state.userReducer.selectedPrivileges
})
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)