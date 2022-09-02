import React, {useEffect} from "react";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {authUser} from '../../redux/authSlice'
import { selectAuth } from "../../redux/authSlice";

const Singup = ({handleSubmit}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {authenticated,error} = useSelector(selectAuth)
    console.log(error)

    const onSubmit = (formProps) => {
        //console.log(formProps)
        dispatch(authUser(formProps))
    }

    useEffect(() => {
      if(authenticated !== "") navigate('/feature')
    }, [authenticated])
    

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label>Email</label>
        <Field name="email" type="text" autoComplete="none" component="input" />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <Field
          name="password"
          type="password"
          autoComplete="none"
          component="input"
        />
      </fieldset>
      <div style={{color: 'red'}}>
        {error}
      </div>
      <button>Sign up</button>
    </form>
  );
};

export default reduxForm({ form: "signup" })(Singup);
