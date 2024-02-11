import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import { GlobalVariables } from '../GlobalState/GlobalVariables'
import SelectWithID from '../component/SelectWithID'


const cols = [
    {
        header:'Region',
        field:'name'
    },
    {
        header:'Address',
        field:'address'
    },
    {
        header: 'Contact Number',
        field: 'contact'
    },
    {
        header: 'Office head',
        field: 'office_head'
    },
    {
        header:'Action',
        field:'action'
    }
]



const Region = () => {
    const {region, employees} = React.useContext(GlobalVariables);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');

  

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            const payload = {id: edit.id, name: edit.name, address: edit.address, contact: edit.contact, user_id: edit.user_id}
            console.log(payload);
            try {
                await apiService.post('/update-region', payload);
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
                <input
                    type="text"
                    name="name"
                    placeholder="Address"
                    value={edit.address}
                    onChange={(e) => setEdit({...edit, address: e.target.value})}
                />
                 <input
                    type="text"
                    name="name"
                    placeholder="Contact number"
                    value={edit.contact}
                    onChange={(e) => setEdit({...edit, contact: e.target.value})}
                />

                Office Head
                <SelectWithID
                    options={['',...employees]}
                    onChange={(e) => setEdit({...edit, user_id: e.target.value})}
                    field={'firstname'}
                    required={true}
                    value={edit.user_id}
                    width={'100%'}
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
                await apiService.post('/create-region', {name: add.name, address: add.address, contact: add.contact, user_id: add.user_id});
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
                    value={add.name}
                    onChange={(e) => setAdd({...add, name:e.target.value})}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Address"
                    value={add.address}
                    onChange={(e) => setAdd({...add, address: e.target.value})}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Contact number"
                    value={add.contact}
                    onChange={(e) => setAdd({...add, contact: e.target.value})}
                />

                Office Head
                <SelectWithID
                    options={['',...employees]}
                    onChange={(e) => setAdd({...add, user_id: e.target.value})}
                    field={'firstname'}
                    required={true}
                    value={add.user_id}
                    width={'100%'}
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