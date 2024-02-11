import React, { useContext, useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import SelectWithID from '../component/SelectWithID'
import { GlobalVariables } from '../GlobalState/GlobalVariables'


const cols = [
    {
        header:'First Name',
        field:'firstname'
    },
    {
        header:'Last name',
        field:'lastname'
    },
    {
        header:'Position',
        field:'position'
    },
    {
        header:'Contact Number',
        field:'contact_number'
    },
    {
        header:'Action',
        field:'action'
    }
]



const Employees = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const {userTypes, employees} = useContext(GlobalVariables)
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');
    const [filter, setFilter] = React.useState('')

    

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-employee', {id: edit.id, user_type_id: edit.user_type_id});
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
    }
        return (
            <div>
                <SelectWithID
                    options={userTypes}
                    onChange={(e) => setEdit({...edit, user_type_id: e.target.value})}
                    field={'name'}
                    value={edit.user_type_id}
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
                await apiService.post('/create-employees', {name: add});
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
            await apiService.post('/delete-employee', {id});
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
            Title='Add employees'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update employees'
        />
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{margin:'10px'}}>
            <SelectWithID
                options={[{id:0,name:'Filter position'},...userTypes]}
                field={'name'}
                // value={filter}
                onChange={(e) => {
                    const position = employees.filter((item) =>parseInt(item.user_type_id) === parseInt(e.target.value))
                    if(e.target.value !== '0'){
                        setFilter(position)
                    }
                }}
            />
            </div>
            {/* <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
                {user.user_type_id === '5' &&
                <button onClick={()=>setIsOpenAdd(true)}>
                    Add
                </button>
                }
            </div> */}
        </div>
        <ReusableTable
            data={Array.isArray(filter)?filter:employees}
            header={cols}
            onClick={(e) => {
                if(parseFloat(user.user_type_id) !== 4 || parseFloat(user.user_type_id) !== 6){
                    setIsOpenUpdate(true)
                    setEdit(e)
                }else{
                    return
                }
               
            }}
            handleDelete={(id)=>handleDelete(id)}
            empTable={true}

        />
    </div>
  )
}

export default Employees