import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../actions';
import { getListData } from '../actions/index';
import { Link } from 'react-router-dom';

class ListItem extends Component {

    deleteSingleItem = ()=>{
        const {ID} = this.props;
        const itemID = {ID}
        this.props.deleteItem(itemID);
        this.props.getListData(this.props.url);
    }

    updateSingleItem=()=>{
        // const { ID, name, listID, assignedUserID } = request.body;
        const { ID, itemName: name, listID} = this.props;
        let assignedUserID = 0;
        const updatedObject = {ID, name, listID, assignedUserID}
    }

    render() {
        console.log('List Item this.props :', this.props);
        const {itemName} = this.props;
        return (
                <div className="list-item">
                    <div className="list-left">
                        {/* <i className="sort fas fa-sort"></i> */}
                        <label className="item-name">{itemName}</label>
                    </div>
                    <div className="list-right">
                        <Link to={`/edit-item/${this.props.ID}`}>
                            <div className="edit"><i className="fas fa-pen"></i></div>
                        </Link>
                        <div onClick={this.deleteSingleItem} className="delete"><i className="fas fa-trash-alt"></i></div>                     
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items,
        user: state.list.userInfo
    }
}


export default connect(mapStateToProps,{
    deleteItem, getListData
})(ListItem); 

