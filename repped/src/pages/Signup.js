import {React,useState} from 'react'
import {ToastContainer} from 'react-toastify';
import { handleError,handleSuccess } from '../utils';
import { Link,useNavigate } from 'react-router-dom';

function Signup() {
  const [signUpInfo,setsignUpInfo] = useState({
    name:'',
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange=(e)=>{
      const {name,value} = e.target;
      console.log(name,value);
      const copysignUpInfo = {...signUpInfo};
      copysignUpInfo[name]=value;
      setsignUpInfo(copysignUpInfo);

  }
  console.log('signUpInfo -> ',signUpInfo)
  const handleSignup =async (e) =>{
    e.preventDefault();
    const {name,email,password} = signUpInfo;
    if(!name||!email||!password)
    {
      return handleError('All fields are required')
    }try{
      const url="http://localhost:5000/auth/signup";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(signUpInfo)
      });
      const result = await response.json();
      const{success,message,error}=result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(error){
        const details=error?.details[0].message;
        handleError(details);
      }else if(!success){
        handleError(message);
      }
      console.log(result);
    }catch(error)
    {
      handleError(error);
    }
  }
  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            autoFocus
            placeholder = 'Enter your name'
            value={signUpInfo.name}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            placeholder = 'Enter your email id'
            value={signUpInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='text'
            name='password'
            placeholder = 'Enter your password'
            value={signUpInfo.password}
          />
        </div>
        <button>Sign Up </button>
        <span>Already have an account?
          <Link to='/login'>Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Signup 

