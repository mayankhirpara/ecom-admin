
import {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Addadmin = () =>{

  let navigate = useNavigate();

  useEffect(()=>{
    let sessionData = sessionStorage.getItem('username');
    // console.log(sessionData);
  
    if(sessionData==null){
      navigate('/')
    }
  })

    let [hobbyRecord, sethobbyRecord] = useState([]);
    let [city, setCity] = useState(["Surat","Rajkot","vadodara","Navasari"]);
    let [state,setState] = useState({
      name : "", email : "", password : "",gender: "",hobby:"", city:""
    })

    const getInputData = (e) =>{
      let name = e.target.name;
      var value = e.target.value;

      
      if(name == 'hobby')
      {
         if(e.target.checked == true){
           hobbyRecord.push(value)
         }
         else{
          let pos = hobbyRecord.findIndex(v => v == value)
          if(pos != -1){
            hobbyRecord.splice(pos,1);
          }
        }
         value = hobbyRecord.toString();
      }

      if(name == 'image'){
        value = e.target.files[0].name;
      }
      

      setState({
        ...state, [name]: value
      })
    }

    const submitData  = (e) =>{
      e.preventDefault();

      // console.log(state);
      fetch("http://localhost:3001/admins",{
        method : "post",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(state)
      })
      .then(async (ress)=>{
         let record = await ress.json();
         if(record){
             toast.success("Record inserted successfully")

         }
         else{
          console.log("something wrong");
         }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    return(
       <div>
        
  &lt;&gt;
  <div className="page-wrapper" style={{marginLeft : "280px"}}>
    {/* ============================================================== */}
    {/* Bread crumb and right sidebar toggle */}
    {/* ============================================================== */}
    <div className="page-breadcrumb">
      <div className="row">
        <div className="col-12 d-flex no-block align-items-center">
          <h4 className="page-title">Form Basic</h4>
          {state.city}
          <div className="ms-auto text-end">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">
                  Library
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    {/* ============================================================== */}
    {/* End Bread crumb and right sidebar toggle */}
    {/* ============================================================== */}
    {/* ============================================================== */}
    {/* Container fluid  */}
    {/* ============================================================== */}
    <div className="container-fluid">
      {/* ============================================================== */}
      {/* Start Page Content */}
      {/* ============================================================== */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <form className="form-horizontal" method="post" onSubmit={(e)=> submitData(e)}>
              <div className="card-body">
                <h4 className="card-title">Admin Form</h4>
                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter Name</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="fname" name="name"  placeholder="Enter Name Here" onChange={(e)=>getInputData(e)} />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lname" className="col-sm-3 text-end control-label col-form-label">Enter Email</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="lname" name="email" placeholder="Enter Email" onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="lname" className="col-sm-3 text-end control-label col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control" name="password" id="lname" placeholder="Password Here" onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="email1" className="col-sm-3 text-end control-label col-form-label">Select Gender</label>
                  <div className="col-sm-9">
                    <input type="radio" name="gender" value="male" onChange={(e)=>getInputData(e)}/>Male
                    <input type="radio" name="gender" value="female" onChange={(e)=>getInputData(e)}/>Female
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="email1" className="col-sm-3 text-end control-label col-form-label">Select HObby</label>
                  <div className="col-sm-9">
                    <input type="checkbox" name="hobby" value="Reading" onChange={(e)=>getInputData(e)}/>Reading
                    <input type="checkbox" name="hobby" value="music" onChange={(e)=>getInputData(e)}/>Music
                    <input type="checkbox" name="hobby" value="cycling" onChange={(e)=>getInputData(e)}/>Cycling
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">Select City</label>
                  <div className="col-sm-9">
                      <select name="city" class="form-control" onChange={(e)=>getInputData(e)}>
                          <option value="">--select city--</option>
                          {city.map((v,i)=>{
                            return(

                              <option value={v}>{v}</option>
                            )
                          })}
                         
                      </select>
                  </div>
                </div>
                
                <div className="form-group row">
                  <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">upload Image</label>
                  <div className="col-sm-9">
                    <input type="file" className="form-control" id="cono1" name="image"  onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>


               
              </div>
              <div className="border-top">
                <div className="card-body">
                  <button type="submit" name="submit" value="Add Record" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
          
        </div>
       
      </div>
      {/* editor */}
      
    </div>
  </div>  <ToastContainer></ToastContainer></div>


    )
}

export default Addadmin;