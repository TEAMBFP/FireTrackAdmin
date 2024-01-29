import React, { useEffect } from 'react'
import apiService from '../api';
import ReusableTable from '../component/ReusableTable/ReusableTable';
import Modal from '../component/Modal/Modal';
import Select from '../component/Select';

const cols = [
    {header: 'User ID', field:'id' },
    {header: 'User type', field:'name' },
    {header: 'Action', field: 'action'},
]
const UserTypes = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [userType, setUserType] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState({name:'', type:''});
    useEffect(() => {
        const handleGetTypes = async () => {
            try {
                const response = await apiService.get('/user-types');
                console.log(response.data);
                setUserType(response.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetTypes();
    },[])


    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-user-type', {id: edit.id, name: edit.name, type: edit.type});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={edit.name}
                    onChange={(e) => setEdit({...edit, name: e.target.value})}
                />
            
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setIsOpenUpdate(false)}>
                    Cancel
                </button>
                <button onClick={handleUpdate}>
                    Update
                </button>
                
            </div>
        )
    }

    const ModalAddContent = () => {
        const handleAdd = async () => {
            try {
                await apiService.post('/create-user-type', {name: add.name, type: add.type});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={add.name}
                    onChange={(e) => setAdd({...add, name: e.target.value})}
                />
            
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setIsOpenAdd(false)}>
                    Cancel
                </button>
                <button onClick={handleAdd}>
                    Add
                </button>
                
            </div>
        )
    }

     const handleDelete = async (id) => {
        try {
            await apiService.post('/delete-user-type', {id});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div style={{overflow:'scroll', height:'100%'}}>
        <Modal
            open={isOpenAdd}
            Content={ModalAddContent}
            Title='Add User Type'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update User Type'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {user.user_type_id === '5' &&
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={userType}
            header={cols}
            onClick={(e) => {
                if(user.user_type_id === '5')
                setIsOpenUpdate(true)
                setEdit(e)
            }}
            handleDelete={(id)=>handleDelete(id)}
        />
    </div>
  )
}

export default UserTypes