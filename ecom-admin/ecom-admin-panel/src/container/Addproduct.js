
import {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Addproduct = () =>{

  let navigate = useNavigate();

  
  let [category, setCategory] = useState([]);

  let [product, setProduct] = useState({
    category : "",title:"",price:"", oprice:"",description:"",image:"", mimage:"" 
  })

useEffect(()=>{
    fetch("http://localhost:3001/category")
    .then(async (ress)=>{
      let record = await ress.json();
      if(record){
         setCategory(record);
         console.log(record);
      }
      else{
        console.log("record not found");
      }
    })
    .catch(err=>{
      console.log("Something wrong");
    })
}, setCategory)



  useEffect(()=>{
    let sessionData = sessionStorage.getItem('username');
    // console.log(sessionData);
  
    if(sessionData==null){
      navigate('/')
    }
  })


  const getInputData = (e) =>{
    let name = e.target.name;
    let value = e.target.value;

    console.log(name, value)

    setProduct({
      ...product ,[name]:value
    })
  }


  const submitData = (e) =>{
    e.preventDefault();
    console.log(product);
    fetch("http://localhost:3001/products",{
      method : "post",
      headers : {"Content-type" : "application/json"},
      body : JSON.stringify(product)
    })
    .then(async (ress)=>{
      let record = await ress.json();
      if(record){
        toast.success("Product add Successfully");
        setProduct({
          category : "",title:"",price:"", oprice:"",description:"",image:"", mimage:"" 
        })

      }
    })
    .catch(err=>{
      toast.error("Something wrong");
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
            <form className="form-horizontal" method="post" onSubmit={(e)=>submitData(e)}>
              <div className="card-body">
                <h4 className="card-title">Admin Form1</h4>
                

                <div className="form-group row">
                  <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">Select Category</label>
                  <div className="col-sm-9">
                      <select name="category" class="form-control" onChange={(e)=>getInputData(e)}>
                          <option value={product.category?"":""} >--select Category--</option>
                        {category && category.map((v,index)=>{
                            return(
                                <option value={v.category} >{v.category}</option>
                            )
                        })}

                      </select>
                  </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter Title</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="title" name="title" value={product.title}  placeholder="Enter Title Here"  onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter Price</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="price" name="price"  placeholder="Enter Price Here"  onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter Old Price</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="oprice" name="oprice"  placeholder="Enter Old Price Here" onChange={(e)=>getInputData(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="fname" className="col-sm-3 text-end control-label col-form-label">Enter description</label>
                  <div className="col-sm-9">
                    <textarea  className="form-control" id="description" name="description"  placeholder="Enter description Here"  onChange={(e)=>getInputData(e)}/>
                  </div>
                </div>
                
                <div className="form-group row">
                  <label htmlFor="cono1" className="col-sm-3 text-end control-label col-form-label">upload Image</label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="cono1" name="image" onChange={(e)=>getInputData(e)} />
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

export default Addproduct;