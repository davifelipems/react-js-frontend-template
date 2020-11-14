import React from 'react'
import Grid from '../template/gridCol'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <input {...props.input} className='form-control'
                 placeholder={props.placeholder}
                 readOnly={props.readOnly} type={props.type} />
        </div>
    </Grid>
)