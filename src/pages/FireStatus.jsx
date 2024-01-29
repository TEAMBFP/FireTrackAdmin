import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'

const cols = [
    {
        header:'Fire Status',
        field:'status'
    },
    {
        header:'Action',
        field:'action'
    }
]



const FireStatus = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [fireStatus, setFireStatus] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');

    useEffect(() => {
        const handleGetFireStatus = async () => {
            try {
                const response = await apiService.get('/fire-status');
                setFireStatus(response.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetFireStatus();
    }, [])

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-fire-status', {id: edit.id, status: edit.status});
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
                    value={edit.status}
                    onChange={(e) => setEdit({...edit, status: e.target.value})}
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
                await apiService.post('/create-fire-status', {status: add});
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
            await apiService.post('/delete-fire-status', {id});
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
            Title='Add Fire Status'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update Fire Status'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            
           {parseInt(user.user_type_id) === 5&& 
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>}
        </div>
        <ReusableTable
            data={fireStatus}
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

export default FireStatus