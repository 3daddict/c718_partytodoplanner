import '../assets/css/list_owner.scss';
import dummyAvatar from '../assets/images/user.png'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './header';

import { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { addSingleItem, editSingleItem } from '../actions/index';
import { getListData } from '../actions/index';

import ListLinkButton from './buttons/list_link_button';
import ChatButton from './buttons/chat_button';
import AddListItemButton from './buttons/add_list_item_button'
import ListItems from './owner-list-item';
import Footer from './footer';
import { userInfo } from 'os';


class EditItem extends Component{

    constructor(props){
        super(props);
        this.url = this.props.match.params.url;
    }

    // componentDidMount() {
    //     this.props.getListData(this.url);
    // }

    goBack = () => {
        this.props.history.goBack();
    }



    renderInput = (props) => {
        const { input } = props;
        console.log('input :', input);
        return (
            <div className="row">
                <input className="add-input-field" {...input} type="text" autoComplete="off" />
                <button className="btn btn-green">EDIT</button>
            </div>
        )
    }

    editItem = () => {
        // const { ID, name, listID, assignedUserID } = request.body;
        this.props.editSingleItem()

    }

    render(){
        const {handleSubmit} = this.props;
        console.log('Edit this.props :', this.props);
        console.log('Edit this.props.history :', this.props.history);
        let {items, list, userInfo } = this.props;
        if(userInfo.avatar){
            var { avatar } = userInfo;
        }
        const sharedlistItems = items.map(item=>{
            return <ListItems key={item.ID} {...item} url={this.url} />
        })

        return(
            <div className="col-2">
                <header>
                    <Header url={this.url} buttons={['Back_button', 'Home_nav_button']} history={this.props.history} avatar={userInfo.avatar ? avatar: null}  login={this.props.userInfo.ID}  />
                </header> 
                <div className='content'>
                    <div className="layout-container">
                        <div className="add">                       
                            <form className='add-item-form-container' onSubmit={handleSubmit(this.editItem)}>
                                <Field name="itemName" type="text" component={this.renderInput} label="Add Item"/>
                            </form>
                        </div>
                    </div>
                </div>
                <footer>
                    <Link to={`/list-shared/${this.url}`}><Footer buttons={['next_page_button']} /></Link>
                </footer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        list: state.list.list,
        items: state.list.items,
        userInfo: state.user.userInfo
    }
}

EditItem = reduxForm({
    form: 'add_item',
})(EditItem);

export default connect(mapStateToProps,{
    addSingleItem, getListData, editSingleItem
})(EditItem); 

