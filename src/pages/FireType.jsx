import React, { useEffect } from 'react'
import apiService from '../api';
import ReusableTable from '../component/ReusableTable/ReusableTable';
import Modal from '../component/Modal/Modal';
import Select from '../component/Select';

const cols = [
    {header: 'Type of Occupancy', field:'name' },
    {header: 'Type', field: 'type'},
    {header: 'Action', field: 'action'}
]
const FireType = () => {
    const [fireType, setFireType] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState({name:'', type:''});
    useEffect(() => {
        const handleGetTypes = async () => {
            try {
                const response = await apiService.get('/fire-types');
                console.log(response.data);
                setFireType(response.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetTypes();
    },[])


    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-fire-type', {id: edit.id, name: edit.name, type: edit.type});
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

                <Select
                    options={[ 'Select type','Structural', 'Non-Structural', 'Vehicular']}
                    onChange={(e) => setEdit({...edit, type: e.target.value})}
                    value={edit.type}
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
                await apiService.post('/create-fire-type', {name: add.name, type: add.type});
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

                <Select
                    options={[ 'Select type','Structural', 'Non-Structural', 'Vehicular']}
                    onChange={(e) => setAdd({...add, type: e.target.value})}
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
            await apiService.post('/delete-fire-type', {id});
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
            Title='Add Fire Type'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update Fire Type'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
        </div>
        <ReusableTable
            data={fireType}
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

export default FireType