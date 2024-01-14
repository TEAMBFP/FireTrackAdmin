import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'

const cols = [
    {
        header:'District',
        field:'name'
    },
    {
        header:'Action',
        field:'action'
    }
]



const District = () => {
    const [district, setDistrict] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');

    useEffect(() => {
        const handleGetdistrict = async () => {
            try {
                const response = await apiService.get('/districts');
                setDistrict(response.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetdistrict();
    }, [])

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-district', {id: edit.id, name: edit.name});
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
                await apiService.post('/create-district', {name: add});
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
            await apiService.post('/delete-district', {id});
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
            Title='Add District'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update District'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
        </div>
        <ReusableTable
            data={district}
            header={cols}
            onClick={(e) => {
                setIsOpenUpdate(true)
                setEdit(e)
            }}
            handleDelete={(id)=>handleDelete(id)}
        />
    </div>
  )
}

export default District