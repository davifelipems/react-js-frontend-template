import React from "react";

export const renderArrowDirection = function (props,field){
    if(!checkOrderBy(props,field)){
        return '';
    }
    return(<i className={'fa fa-caret-'+getLabelDirection(props)}/>);
} 

export const toggleOrderBy = function(props,field){
    props.setOrderBy(props,field);
    props.getList(props,props.currentPage);
}

export const search = function(props,e){
    e.preventDefault();
    props.getList(props,0);
}

function checkOrderBy(props,field){
    return (props.paginationParams.orderBy 
            && props.paginationParams.orderBy === field);
}

function getLabelDirection(props){
    return (props.paginationParams.direction 
        && props.paginationParams.direction === "ASC" ? "up" : "down");
}