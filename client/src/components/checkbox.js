import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { getListData } from '../actions';


export default class Checkbox extends Component {
    constructor(props){
        super(props);
        this.state = {
            isChecked: !!props.assignedUserID
        }
        this.toggleCheck = this.toggleCheck.bind(this);
    }

    toggleCheck(){
        this.setState({
            isChecked: !this.state.isChecked
        })
    }


    render(){
        // console.log('Single Checkbox this.props :', this.props);
        // const { ID, name, listID, assignedUserID } = request.body;
        console.log('Checkbox Props:', this.props);
        const {name, assignedUserID} = this.props;
        return (
            <Fragment>
                <div className="list_item">
                    <div className="shared-left">
                        {/* <input type="checkbox" name={name} value={name} checked={assignedUserID ? 'checked' : false} onChange={()=>this.props.checkItem()} /> */}
                        <input type="checkbox" name={name} value={name} checked={this.state.isChecked ? 'checked' : false}  onChange={this.toggleCheck} />
                        <label>{name}</label>
                    </div>
                    {/* <div className="shared-right">
                        <img className="person" src={michael} alt="user"/>
                    </div> */}
                </div>
            </Fragment>
        )
    }
}
