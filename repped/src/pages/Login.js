import {useState,React} from 'react'
import {ToastContainer} from 'react-toastify';
import { handleError,handleSuccess } from '../utils';
import { Link,useNavigate } from 'react-router-dom';
function Login() {
  const [loginInfo,setloginInfo] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const handleChange=(e)=>{
      const {name,value} = e.target;
      console.log(name,value);
      const copyloginInfo = {...loginInfo};
      copyloginInfo[name]=value;
      setloginInfo(copyloginInfo);

  }
  console.log('loginInfo -> ',loginInfo)
  const handleLogin =async (e) =>{
    e.preventDefault();
    const {email,password} = loginInfo;
    if(!email||!password)
    {
      return handleError('All fields are required')
    }try{
      const url="http://localhost:5000/auth/login";
      const response = await fetch(url,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const{success,message,jwtToken,error,email}=result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInUser',email);
        setTimeout(()=>{
          navigate('/swipenow')
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
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='text'
            name='email'
            placeholder = 'Enter your email id'
            value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder = 'Enter your password'
            value={loginInfo.password}
          />
        </div>
        <button>Login </button>
        <span>Don't have an account?
          <Link to='/signup'>Sign up</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default Login 

