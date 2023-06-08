import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";



const Login  = () =>{

    let navigate = useNavigate();

    let [adminData, setAdminData] = useState({
        email : "",password : ""
    })

    const submitData = (e) =>{
        e.preventDefault();
        console.log(adminData.email)
        fetch("http://localhost:3001/admins?email="+adminData.email)
        .then(async (ress)=>{
            let record = await ress.json();
        
            if(record.length != 0){
                if(record[0].password == adminData.password){
                    sessionStorage.setItem('username',record[0].name);
                    navigate('/dashboard');
                }
                else{
                    toast.error("Invalid password");
                }
            }
            else{
                toast.error("Invalid email");

            }
        })
        .catch(error=>{
            toast.error('Invalid email');
        })
    }


    const getInputData = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setAdminData({
            ...adminData, [name]:value
        })
    }   


    return(
       <div className="main-wrapper">
      
  {/* ============================================================== */}
  {/* Preloader - style you can find in spinners.css */}
  {/* ============================================================== */}
 
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
      <div id="loginform">
        <div className="text-center pt-3 pb-3">
          <span className="db"><img src="../assets/images/logo.png" alt="logo" /></span>
        </div>
        {/* Form */}
        <form className="form-horizontal mt-3" id="loginform" method="post" onSubmit={(e)=>submitData(e)}>
          <div className="row pb-4">
            <div className="col-12">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-success text-white h-100" id="basic-addon1"><i className="mdi mdi-account fs-4" /></span>
                </div>
                <input type="text" className="form-control form-control-lg" name="email" placeholder="email" aria-label="Username" aria-describedby="basic-addon1" required onChange={(e)=>getInputData(e)}/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-warning text-white h-100" id="basic-addon2"><i className="mdi mdi-lock fs-4" /></span>
                </div>
                <input type="text" className="form-control form-control-lg" name="password" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required onChange={(e)=>getInputData(e)}/>
              </div>
            </div>
          </div>
          <div className="row border-top border-secondary">
            <div className="col-12">
              <div className="form-group">
                <div className="pt-3">
                  <button className="btn btn-info" id="to-recover" type="button">
                    <i className="mdi mdi-lock fs-4 me-1" /> Lost password?
                  </button>
                  <button className="btn btn-success float-end text-white" type="submit" value="Login" name="submit">
                    Login
                  </button>
                  <button className="btn btn-success float-end text-white" type="submit" value="Login" name="submit">
                   <NavLink to="/register">Sign</NavLink>
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

export default Login;