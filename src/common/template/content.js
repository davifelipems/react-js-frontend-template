import React from 'react'
import If from '../operator/if';

export default props => (
    <section className='content'>
        <div className="box box-primary">
            <If test={props.loading} >
              <div className="overlay">
                <i className="fa fa-refresh fa-spin"></i>
              </div>
            </If>
            <If test={props.title}>
                <div className="box-header with-border">
                    <h3 className="box-title">{props.title}</h3>
                    <div className="box-tools pull-right">
                        {props.topRight}
                        <span className="label label-primary">{props.label}</span>
                    </div>
                </div>
            </If>
            <div className="box-body">
                {props.children}
            </div>
            <If test={props.footer}>
                <div className="box-footer">
                    {props.footer}
                </div>
            </If>
            
        </div>
    </section >
)