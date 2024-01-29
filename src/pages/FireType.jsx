import React, { useEffect } from 'react'
import apiService from '../api';
import ReusableTable from '../component/ReusableTable/ReusableTable';
import Modal from '../component/Modal/Modal';
import Select from '../component/Select';
import SelectWithID from '../component/SelectWithID';

const fireTypeCols = [
    {header: 'Fire Type ID', field:'id' },
    {header: 'Fire Type', field:'name' },
    {header: 'Action', field: 'action'}
]

const occupancyCols = [
    {header: 'Occupancy ID', field:'id' },
    {header: 'Occupancy', field:'name' },
    {header: 'Fire Type', field:'fire_type_name'},
    {header: 'Action', field: 'action'}
]

const FireType = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [fireType, setFireType] = React.useState([]);
    const [occupancy, setOccupancy] = React.useState([]);
    const [isOpenUpdateFireType, setIsOpenUpdateFireType] = React.useState(false);
    const [isOpenUpdateOccupancy, setOpenUpdateOccupancy] = React.useState(false);
    const [isOpenAddFireType, setIsOpenAddFireType] = React.useState(false);
    const [isOpenAddOccupancy, setIsOpenAddOccupancy] = React.useState(false);
    const [editFireType, setEditFireType] = React.useState('');
    const [editOccupancy, setEditOccupancy] = React.useState('');
    const [addFireType, setAddFireType] = React.useState('');
    const [add, setAdd] = React.useState({name:'', type:''});

    useEffect(() => {
        const handleGetTypes = async () => {
            try {
                const fireTyps = await apiService.get('/fire-types');
                setFireType(fireTyps?.data);
                const occupancies = await apiService.get('/fire-occupancies');
                setOccupancy(occupancies?.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetTypes();
    },[])

    const ModalAddFireType = () => {
        const handleAdd = async () => {
            try {
                await apiService.post('/create-fire-type', {name: addFireType});
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
                    value={addFireType}
                    onChange={(e) =>setAddFireType( e.target.value)}
                />    
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setIsOpenAddFireType(false)}>
                    Cancel
                </button>
                <button onClick={handleAdd}>
                    Add
                </button>
                
            </div>
        )
    }

    const ModalAddOccupancy = () => {
        const handleAdd = async () => {
            try {
                await apiService.post('/create-fire-occupancy', {name: add.name, fire_type_id: add.type});
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

                <SelectWithID
                    options={[{name:'',id:''},...fireType]}
                    onChange={(e) => setAdd({...add, type: e.target.value})}
                    value={add.type}
                    field={'name'}
                />
            
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setIsOpenAddOccupancy(false)}>
                    Cancel
                </button>
                <button onClick={handleAdd}>
                    Add
                </button>
                
            </div>
        )
    }

    const ModalUpdateFireType = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-fire-type', {id: editFireType.id, name:editFireType.name});
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
                    value={editFireType.name}
                    onChange={(e) => setEditFireType({...editFireType, name: e.target.value})}
                />
            
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setIsOpenUpdateFireType(false)}>
                    Cancel
                </button>
                <button onClick={handleUpdate}>
                    Update
                </button>
                
            </div>
        )
    }

    const ModalUpdateOccupancy = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-fire-occupancy', {id: editOccupancy.id, name: editOccupancy.name, fire_type_id: editOccupancy.fire_type_id});
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
                    value={editOccupancy.name}
                    onChange={(e) => setEditOccupancy({...editOccupancy, name: e.target.value})}
                />

                <SelectWithID
                    options={[{name:"",id:""},...fireType]}
                    onChange={(e) => setEditOccupancy({...editOccupancy, fire_type_id: e.target.value})}
                    value={editOccupancy.fire_type_id}
                    field={'name'}
                />
            
                <button style={{marginRight:'10px', marginTop:'10px'}} onClick={() => setOpenUpdateOccupancy(false)}>
                    Cancel
                </button>
                <button onClick={handleUpdate}>
                    Update
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

    const handleDeleteOccupancy = async (id) => {
        try {
            await apiService.post('/delete-fire-occupancy', {id});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div style={{overflow:'scroll', height:'100%'}}>
         <Modal
            open={isOpenAddFireType}
            Content={ModalAddFireType}
            Title='Add Fire Type'
        />
         <Modal
            open={isOpenUpdateFireType}
            Content={ModalUpdateFireType}
            Title='Update Fire Type'
        />
        {/* FIRE OCCUPANCY */}
        <Modal
            open={isOpenAddOccupancy}
            Content={ModalAddOccupancy}
            Title='Add Fire Occupancy'
        />
         <Modal
            open={isOpenUpdateOccupancy}
            Content={ModalUpdateOccupancy}
            Title='Update Fire Occupancy'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {user.user_type_id === '5' &&
            <button onClick={()=>setIsOpenAddFireType(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={fireType}
            header={fireTypeCols}
            onClick={(e) => {
                if(user.user_type_id === '5')
                setIsOpenUpdateFireType(true)
                setEditFireType(e)
            }}
            handleDelete={(id)=>handleDelete(id)}
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {user.user_type_id === '5' &&
            <button onClick={()=>setIsOpenAddOccupancy(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={occupancy}
            header={occupancyCols}
            onClick={(e) => {
                if(user.user_type_id === '5')
                setOpenUpdateOccupancy(true)
                console.log(e);
                setEditOccupancy(e)
            }}
            handleDelete={(id)=>handleDeleteOccupancy(id)}
        />
        
    </div>
  )
}

export default FireType