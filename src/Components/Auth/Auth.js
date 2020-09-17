import { FormGroup } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import "./Auth.css"
import Header from '../Header/Header'
import logoBlack from '../../images/Logo-black.png'
import fb from '../../images/Icon/fb.png'
import google from '../../images/Icon/google.png'
import * as firebase from "firebase/app";
import { MyContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const Auth = () => {
    const [showArea,setShowArea,loggedIn,setLoggedIn,name, setName]=useContext(MyContext)
    const [confirmationError, setConfirmationError]=useState(false)

    const [isSignedUp, setisSignedUp]=useState(false)
    const [submiter, setSubmiter]=useState("")
    const [user, setUser]=useState({})

    const location=useLocation().location?.pathname
    const history=useHistory()

    const formHandler=(event)=>{
        event.preventDefault()
        
        
            if(submiter === "signup") {
            
                user.password==user.confirmationPassword ?
                firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
                .then(res=>{
                setConfirmationError(false)
                setUser({...user, signupError:""})
                    setisSignedUp(true)
                })
                .catch(err=>{
                    setUser({...user, signupError:err.message})
                })
                : setConfirmationError(true)
        
            }
        
    

        submiter === "signin" &&
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || "/see-hotel")
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
        
    }

    const facebookSigninHandler =()=>{
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }

    const googleSigninHandler =()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const currentUser = firebase.auth().currentUser;
            setName(currentUser.displayName)
            setLoggedIn(true)
            history.replace(location || '/')
        })
        .catch(err=>{
            setUser({...user, signinError:err.message})
        })
    }

    const loginToggleHandler=()=>{
        setisSignedUp(true)
        setConfirmationError(false)
        
        setUser({...user, signupError:""})
    }
    const signupToggleHandler=()=>{
        setisSignedUp(false)
        setUser({...user, signinError:""})
    }
    
    return (
        <div>
            <Header  color="black" img={logoBlack}></Header>
            
            <form onSubmit={formHandler} className="form-group auth-form-group">
                
                <FormGroup>
                {
                    isSignedUp? <h2 style={{textAlign:"left"}}>Login</h2>
                    : <h2 style={{textAlign:"left"}}>Create an account</h2>
                }
                    {
                        !isSignedUp && <>
                            <input 
                            onBlur={(event)=>setUser({...user,fname:event.target.value})} type="text" placeholder="First name" required/>

                            <input 
                            onBlur={(event)=>setUser({...user,lname:event.target.value})}
                            type="text" placeholder="Last name" required/>
                        </> 
                    }
                    <input onBlur={(event)=>setUser({...user,email:event.target.value})} type="email" placeholder="Email address" required/>

                    <input onBlur={(event)=>setUser({...user,password:event.target.value})} type="password" placeholder="Password" required/>


                    {
                        !isSignedUp && <input
                        onBlur={(event)=>setUser({...user,confirmationPassword:event.target.value})}
                         type="password" placeholder="Confirm Password" required/>
                    }


                    {
                        isSignedUp && <div style={{display:"flex", justifyContent:"space-between", fontSize:"13px", fontWeight:"500"}}>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <input id="checkbox"  type="Checkbox" /><label for="checkbox" style={{marginBottom:"6px"}}>Remember me</label>
                        </div>
                        <p style={{color:"orange", cursor:"pointer"}}>Fogot Password</p>
                    </div>
                    }

                    {
                        user.signinError ? <p style={{color:"red", fontSize:"13px"}}>{user.signinError}</p>
                        : ""
                    }
                    {
                         user.signupError ? <p style={{color:"red", fontSize:"13px"}}>{user.signupError}</p>
                         : ""
                    }
                    {
                        confirmationError ? <p style={{color:"red", fontSize:"13px"}}>Doesn't match your password</p>
                        : ""
                    }
                    {
                        isSignedUp ? <input name="signin" onClick={(event)=>setSubmiter(event.target.name)} type="submit" value="Signin"/>
                        : <input name="signup" onClick={(event)=>setSubmiter(event.target.name)} type="submit" value="Signup"/>
                    }
                </FormGroup>
                
                    {
                        isSignedUp ?<>
                        <span>Don't have an account? </span>
                        <span onClick={signupToggleHandler} style={{color:"orange",cursor:"pointer"}}>Signup</span>
                    </>
                        
                        :<>
                        <span>Already have an account? </span>
                        <span onClick={loginToggleHandler} style={{color:"orange",cursor:"pointer"}}>Login</span>
                        </>
                        
                    } 
            </form>


           <div style={{width:"300px", margin:"auto"}}>
            <p style={{textAlign:"center"}}>---------- Or -----------</p>

                    <div onClick={facebookSigninHandler} className="auth-provider-section">
                        <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={fb} alt=""/>
                        <p>Continue with Facebook</p>
                    </div>

                    <div onClick={googleSigninHandler} className="auth-provider-section">
                        <img style={{width:"30px", height:"30px", marginRight:"10px"}} src={google} alt=""/>
                        <p>Continue with Google</p>
                    </div>

                </div>
        </div>
    );
};

export default Auth;