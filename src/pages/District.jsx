import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import SelectWithID from '../component/SelectWithID'
import { GlobalVariables } from '../GlobalState/GlobalVariables'


const cols = [
    {
        header:'District',
        field:'name'
    },
    {
        header:'District Head',
        field:'district_head'
    },
    {
        header:'post code',
        field:'post_code'
    },
    {
        header: 'region',
        field: 'region_name', 
    },
    {
        header:'Action',
        field:'action'
    }
]



const District = () => {
    const {districts, employees, region} = React.useContext(GlobalVariables);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');



    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-district', edit);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
    }
        return (
            <div>
            Name
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setEdit({...edit, name: e.target.value})}
                required
                style={{border:'1px solid black'}}
                value={edit.name}
            />
            District Head
            <SelectWithID
                options={['',...employees]}
                onChange={(e) => setEdit({...edit, user_id: e.target.value})}
                field={'firstname'}
                required={true}
                value={edit.user_id}
                width={'100%'}


            />
            Postal Code
            <input
                type="text"
                name="post_code"
                placeholder="Post Code"
                onChange={(e) => setEdit({...edit, post_code: e.target.value})}
                required
                style={{border:'1px solid black'}}
                value={edit.post_code}
            />
            Region
            <SelectWithID
                options={['',...region]}
                onChange={(e) => setEdit({...edit, region_id: e.target.value})}
                field={'name'}
                required={true}  
                value={edit.region_id}
                width={'100%'}
                
            />  
            <div style={{marginTop:'10px'}}>        
            <button style={{marginRight:'10px'}} onClick={() => setIsOpenUpdate(false)}>
                Cancel
            </button>
            <button onClick={handleUpdate}>
                Add
            </button>
            </div>
                
            </div>
        )
    }

    const ModalAddContent = () => {
        const handleAdd = async () => {
            try {
                await apiService.post('/create-district', add);
                window.location.reload();
            } catch (error) {
                console.log(error.response.data);
            }
        }
        console.log(employees);
        return (
            <div>
            Name
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setAdd({...add, name: e.target.value})}
                required
                style={{border:'1px solid black'}}
            />
            District Head
            <SelectWithID
                options={['',...employees]}
                onChange={(e) => setAdd({...add, user_id: e.target.value})}
                field={'firstname'}
                required={true}
                width={'100%'}
            />
            Postal Code
            <input
                type="text"
                name="post_code"
                placeholder="Post Code"
                onChange={(e) => setAdd({...add, post_code: e.target.value})}
                required
                style={{border:'1px solid black'}}
            />
            Region
            <SelectWithID
                options={['',...region]}
                onChange={(e) => setAdd({...add, region_id: e.target.value})}
                field={'name'}
                required={true}  
                width={'100%'}
            />  
            <div style={{marginTop:'10px'}}>        
            <button style={{marginRight:'10px'}} onClick={() => setIsOpenAdd(false)}>
                Cancel
            </button>
            <button onClick={handleAdd}>
                Add
            </button>
            </div>
                
            </div>
        )
    }

    const handleDelete = async (id) => {
        try {
            await apiService.post('/delete-district', {id});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
   
  return (
    <div style={{ height:'100%'}}>
        <Modal
            open={isOpenAdd}
            Content={ModalAddContent}
            Title='Add District'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update District'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {parseInt(user.user_type_id) === 5 &&
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={districts}
            header={cols}
            onClick={(e) => {
                if(parseInt(user.user_type_id) === 5)
                setIsOpenUpdate(true)
                setEdit(e)
            }}
            handleDelete={(id)=>handleDelete(id)}
        />
    </div>
  )
}

export default District