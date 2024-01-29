import React, { useContext, useEffect } from 'react'
import apiService from '../api'
import { GlobalVariables } from '../GlobalState/GlobalVariables';

const AccounInfo = () => {
  const {userTypes} = useContext(GlobalVariables);
  const user = localStorage.getItem('user')
  let imageRef = React.useRef(null);
  const [data,setData] = React.useState()

  useEffect(()=>{
    user && setData(JSON.parse(user))
  },[user])



  const handleUpdate = async () => {
    const file = data.image
    const reader = new FileReader();

    reader.onloadend =  () => {
      const base64 = reader.result;
      requestUpdate(base64)
     
    };

     

    if (file && typeof file !== 'string') {
      reader.readAsDataURL(file);
    }else{
       requestUpdate(null)
    }
    
  }

  const requestUpdate = async (base64) => {
     try {
        const payload = { 
          info : data.info,
          id : JSON.parse(user).id, 
          name : data.name,
          image : base64??data.image,
          email: JSON.parse(user).email
        };
        console.log(payload);
        const res = await apiService.post('/update-user', payload);
        localStorage.setItem('user', JSON.stringify(res.data));
        // window.location.reload();
      } catch (error) {
        console.log(error);
      }
  }

  console.log(user);
  return (
    <div style={{padding:'20px'}}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{display:'flex'}}>
            <img alt='Profile IMAGE' 
              src={data?.image ? typeof data?.image ==='string'?  data.image : URL.createObjectURL(data.image) : 'https://www.w3schools.com/howto/img_avatar.png'} 
              height={'223px'}
              width={'220px'}

            />
            <div style={{marginLeft:'14px'}}>
            <input 
              type="file" 
              accept="image/*" 
              style={{display: 'none'}} 
              ref={input => imageRef = input}
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file);
                setData({...data, image:file})
                // Handle the file here
                }}
              />
              <button onClick={() => imageRef.click()}>
                Upload photo
              </button>
            </div>
            </div>

            <div>
              <button style={{marginRight:'12px'}}>
                Cancel
              </button>
              <button onClick={handleUpdate}>
                Update
              </button>
            </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', rowGap:'9px', marginTop:'26px'}}>
            <span>Position</span>
              <input 
                  style={{height:'32px', width:'100%', fontSize:'16px'}}
                  onChange={(e)=>{
                      setData({...data, info:{...data.info, position:e.target.value}})
                  }}
                 value={userTypes.filter((item)=>item.id === data?.user_type_id)[0]?.name}
                 readOnly
                />
            <span>First name</span>
             <input 
                  style={{height:'32px', width:'100%', fontSize:'16px'}}
                  onChange={(e)=>{
                      setData({...data, firstname:e.target.value})
                  }}
                  value={data?.firstname}
                />
            <span>Last name</span>
             <input 
                  style={{height:'32px', width:'100%', fontSize:'16px'}}
                  onChange={(e)=>{
                      setData({...data, lastname:e.target.value})
                  }}
                  value={data?.lastname}
                />
        </div>
    </div>
  )
}

export default AccounInfo