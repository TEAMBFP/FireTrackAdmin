import React, { useEffect } from 'react'
import apiService from '../api'
import Modal from '../component/Modal/Modal'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import { GlobalVariables } from '../GlobalState/GlobalVariables'
import SelectWithID from '../component/SelectWithID'


const cols = [
    {
        header:'Barangay',
        field:'name'
    },
    {
        header:'Address',
        field:'address'
    },
    {
        header: 'Contact Number',
        field: 'contact_number'
    },
    {
        header: 'Fire Station',
        field: 'fire_station_name'
    },
    {
        header: 'District',
        field: 'district_name'
    },
    {
        header: 'Region',
        field: 'region_name'
    },
    {
        header:'Action',
        field:'action'
    }
]



const Barangay = () => {
    const {barangays, fireStations, districts, region} = React.useContext(GlobalVariables);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState('');
    const [add, setAdd] = React.useState('');

  

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-barangay', edit);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
    }
        return (
            <div>
                Barangay
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={edit.name}
                    onChange={(e) => setEdit({...edit, name: e.target.value})}
                    style={{border:'1px solid black'}}

                />
                Address
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={edit.address}
                    onChange={(e) => setEdit({...edit, address: e.target.value})}
                    style={{border:'1px solid black'}}

                />
                Contact Number
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={edit.contact_number}
                    onChange={(e) => setEdit({...edit, contact_number: e.target.value})}
                    style={{border:'1px solid black'}}
                />
                Fire Station
                <SelectWithID
                    value={edit.fire_station_id}
                    onChange={(e) => setEdit({...edit, fire_station_id: e.target.value})}
                    placeholder='Fire Station'
                    options={fireStations}
                    field='name'
                    style={{border:'1px solid black'}}
                />
                District
                <SelectWithID
                    value={edit.district_id}
                    onChange={(e) => setEdit({...edit, district_id: e.target.value})}
                    placeholder='District'
                    options={districts}
                    field='name'
                    style={{border:'1px solid black'}}
                />
                Region
                <SelectWithID
                    value={edit.region_id}
                    onChange={(e) => setEdit({...edit, region_id: e.target.value})}
                    placeholder='Region'
                    options={region}
                    field='name'
                    style={{border:'1px solid black'}}
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
                await apiService.post('/create-barangay', add);
                window.location.reload();
                
            } catch (error) {
                console.log(error.response.data);
            }
        }
        return (
            <div>
                Barangay
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setAdd({...add, name: e.target.value})}
                    style={{border:'1px solid black'}}
                    required
                />
                Address
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setAdd({...add, address: e.target.value})}
                    style={{border:'1px solid black'}}
                    required
                />
                Contact Number
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setAdd({...add, contact_number: e.target.value})}
                    style={{border:'1px solid black'}}
                    required
                />
                Fire Station
                <SelectWithID
                    onChange={(e) => setAdd({...add, fire_station_id: e.target.value})}
                    options={['',...fireStations]}
                    field='name'
                    style={{border:'1px solid black'}}
                    required={true}
                />
                District
                <SelectWithID
                    onChange={(e) => setAdd({...add, district_id: e.target.value})}
                    placeholder='District'
                    options={['',...districts]}
                    field='name'
                    style={{border:'1px solid black'}}
                    required={true}
                />
                Region
                <SelectWithID
                    onChange={(e) => setAdd({...add, region_id: e.target.value})}
                    placeholder='Region'
                    options={['',...region]}
                    field='name'
                    style={{border:'1px solid black'}}
                    required={true}
                /> 
            
                <button style={{marginRight:'10px'}} onClick={() => setIsOpenAdd(false)}>
                    Cancel
                </button>
                <button onClick={handleAdd}>
                    Update
                </button>
                
            </div>
        )
    }

    const handleDelete = async (id) => {
        try {
            await apiService.post('/delete-barangay', {id});
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
            Title='Add Barangay'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update Barangay'
        />
        <div style={{display:'flex', justifyContent:'end', marginBottom:'10px'}}>
            {parseInt(user.user_type_id) === 5 &&
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
            }
        </div>
        <ReusableTable
            data={barangays}
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

export default Barangay