import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import { GlobalVariables } from '../GlobalState/GlobalVariables'


const cols = [
    {
        header:'Region',
        field:'name'
    },
    {
        header:'Action',
        field:'action'
    }
]



const Region = () => {
    const {region} = React.useContext(GlobalVariables);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');

  

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-region', {id: edit.id, name: edit.name});
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
            
                <button style={{marginRight:'10px'}} onClick={() => setIsOpenUpdate(false)}>
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
                await apiService.post('/create-region', {name: add});
                window.location.reload();
            } catch (error) {
                console.log(error.response.data);
            }
        }
        return (
            <div>
            <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={add.status}
                    onChange={(e) => setAdd(e.target.value)}
                />
            
                <button style={{marginRight:'10px'}} onClick={() => setIsOpenAdd(false)}>
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
            await apiService.post('/delete-region', {id});
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
            Title='Add Region'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update Region'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {parseInt(user.user_type_id) === 5 &&
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={region}
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

export default Region