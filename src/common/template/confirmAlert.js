import React from 'react'
import { confirmAlert } from 'react-confirm-alert'

export const confirmAlertCustom = function(yesFunction,msg,btnLabel){

    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='callout callout-danger'>
                <h1>Are you sure?</h1>
                <p>{msg}</p>
                <div className="modal-footer">
                    <button className='btn btn-default btn-flat'
                        onClick={yesFunction.bind(this,onClose)}
                    >
                        {btnLabel}
                    </button>
                    <button className='btn btn-default btn-flat' onClick={onClose}>No</button>
                </div>
            </div>
          );
        }
    })
}