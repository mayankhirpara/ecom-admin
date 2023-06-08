import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register  = () =>{
 

    let [state, setState] = useState({
        name : "", email :"", password :"", cpass :""
    })

    let [userData , setUserData] = useState([]) 

          const ChangeData =(e)=>{
            let name = e.target.name;
            let value =e.target.value;

            setState({
              ...state, [name]:value
            })
          }

          useEffect(()=>{
            fetch("http://localhost:3001/admins",{
              method :"GET",
              headers :{
                "Content-Type" : "application/json"
              }
            })
            .then(async (ress)=>{
              let data = await ress.json();
          
              setUserData(data);
          })
          })
           const submitData =(e)=>{
              e.preventDefault();
            if(validate()){
              var checkData = false;
              userData.map(((v,index)=>{
                if(v.email == state.email){
                  checkData = true;
                }
              }))

              if(checkData){
                toast.error("Email is already register")

              }
              else{
                fetch("http://localhost:3001/admins",{
                  method :"POST",
                  headers :{
                    "Content-Type" : "application/json"
                  },
                  body : JSON.stringify(state)
                })
                .then(async(res)=>{
                  let data =await res.json();
                  toast.success("Register successfully")
                  setState({name : "", email :"", password :""})
                })
                .catch((err)=>{
                      toast.error("Somethig wrong");
                })
              }
            }
           
           }

           const validate=()=>{
            let result = true;
            if(state.name === '' || state.name === null)
                {
                  result = false;
                  toast.error("username is requrired");
                }
                else if(state.email === '' || state.email === null)
                {
                  toast.error("email is requrired");
                  return  false;
                }  
                else if(state.password === '' || state.password === null)
                {
                  toast.error("password is requrired");
                  return  false;
                }     
                else if(state.password !==  state.cpass)
                {
                  toast.error("password and confirm password not match");
                  return  false;
                }  
                else{
                  return  true;
                }           
    
           }

    return(
       <div className="main-wrapper">
  {/* ============================================================== */}
  {/* Preloader - style you can find in spinners.css */}
  {/* ============================================================== */}
  <div className="preloader">
    <div className="lds-ripple">
      <div className="lds-pos" />
      <div className="lds-pos" />
    </div>
  </div>``
  {/* ============================================================== */}
  {/* Preloader - style you can find in spinners.css */}
  {/* ============================================================== */}
  {/* ============================================================== */}
  {/* Login box.scss */}
  {/* ============================================================== */}
  <div className="
      auth-wrapper
      d-flex
      no-block
      justify-content-center
      align-items-center
      bg-dark
    ">
    <div className="auth-box bg-dark border-top border-secondary">
      <div>
        <div className="text-center pt-3 pb-3">
          <span className="db"><img src="../assets/images/logo.png" alt="logo" /></span>
        </div>
        {/* Form */}
        <form className="form-horizontal mt-3" action="index.html" onSubmit={(e)=>submitData(e)}>
          <div className="row pb-4">
            <div className="col-12">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-success text-white h-100" id="basic-addon1"><i className="mdi mdi-account fs-4" /></span>
                </div>
                <input type="text" className="form-control form-control-lg" placeholder="Username" name="name" value={state.name} aria-label="Username" aria-describedby="basic-addon1" required onChange={(e)=>ChangeData(e)} />
              </div>
              {/* email */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-danger text-white h-100" id="basic-addon1"><i className="mdi mdi-email fs-4" /></span>
                </div>
                <input type="text" className="form-control form-control-lg" placeholder="Email Address" name="email" value={state.email} aria-label="Username" aria-describedby="basic-addon1" required onChange={(e)=>ChangeData(e)} />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-warning text-white h-100" id="basic-addon2"><i className="mdi mdi-lock fs-4" /></span>
                </div>
                <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={state.password} aria-label="Password" aria-describedby="basic-addon1" required onChange={(e)=>ChangeData(e)} />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-info text-white h-100" id="basic-addon2"><i className="mdi mdi-lock fs-4" /></span>
                </div>
                <input type="text" className="form-control form-control-lg" placeholder=" Confirm Password" name="cpass" value={state.cpass} aria-label="Password" aria-describedby="basic-addon1" required onChange={(e)=>ChangeData(e)} />
              </div>
            </div>
          </div>
          <div className="row border-top border-secondary">
            <div className="col-12">
              <div className="form-group">
                <div className="pt-3 d-grid">
                  <button className="btn btn-block btn-lg btn-info"  type="submit" value="signup" name="submit">
                   <NavLink to='/dashboard'><a> Sign Up</a></NavLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ToastContainer></ToastContainer>
</div>

    )
}

export default Register;