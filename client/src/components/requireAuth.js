import React, { Component } from 'react';
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice";


export default ChildComponent => {
    const {authenticated,error} = useSelector(selectAuth)
  class ComposedComponent extends Component {
    
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return ComposedComponent;
};