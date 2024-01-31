import React, { useEffect } from 'react'
import apiService from '../api'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import Modal from '../component/Modal/Modal'
import { GlobalVariables } from '../GlobalState/GlobalVariables'
import SelectWithID from '../component/SelectWithID'
import useDebounce from '../lib/Debounce'
import axios from 'axios'

const cols = [
    {header: 'ID', field: 'id'},
    {header: 'Name', field: 'name'},
    {header: 'Address', field:'address' },
    {header: 'District', field:'district_name' },
    {header: 'Latitude', field: 'latitude'}, 
    {header: 'Longitude', field: 'longitude'}, 
    {header: 'Contact number', field: 'number'}, 
    {header: 'Action', field: 'action'}
]

const Firestations = () => {
    const { districts, region } = React.useContext(GlobalVariables);
    const user = JSON.parse(localStorage.getItem('user'));
    const [firestations, setFirestations] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState({
        name:'',
        id:'',
        address:'',
        latitude:'',
        longitude:'',
        number:'',
        district_id:''
    
    });
    const [add, setAdd] = React.useState({
        name:'',
        address:'', 
        latitude:'', 
        longitude:'', 
        number:'',
        district_id:''
    });

    const [filter, setFilter] = React.useState({
        district_id:'',
        region_id:''
    });

    useEffect(() => {
        const handleGetFirestations = async () => {
            try {
              
                const response = await apiService.get('/firestations?district_id='+filter.district_id+'&region_id='+filter.region_id);
                setFirestations(response.data);
            } catch (error) {
                console.log(error);
            }
        
        }
        handleGetFirestations();
    }, [filter])

    const ModalUpdateContent = () => {
        const handleUpdate = async () => {
            try {
                await apiService.post('/update-firestation', edit);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
              <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={edit.name}
                    onChange={(e) => setEdit({...edit, name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={edit.address}
                    onChange={(e) => setEdit({...edit, address: e.target.value})}
                />

                 <SelectWithID
                    options={districts}
                    onChange={(e) => setEdit({...edit, district_id: e.target.value})}
                    value={edit.district_id}
                    field={'name'}
                />

                <input
                    type="text"
                    placeholder="Latitude"
                    value={edit.latitude}
                    onChange={(e) => setEdit({...edit, latitude: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="Longtitude"
                    value={edit.longitude}
                    onChange={(e) => setEdit({...edit, longitude: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="Phone number"
                    value={edit.number}
                    onChange={(e) => setEdit({...edit, number: e.target.value})}
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
                await apiService.post('/create-firestation', add);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={add.name}
                    onChange={(e) => setAdd({...add, name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={add.address}
                    onChange={(e) => setAdd({...add, address: e.target.value})}
                />

                <SelectWithID
                    options={[{id:'', name:'Select District'},...districts]}
                    onChange={(e) => setAdd({...add, district_id: e.target.value})}
                    field={'name'}
                    value={add.district_id}
                />

                <input
                    type="text"
                    placeholder="Latitude"
                    value={add.latitude}
                    onChange={(e) => setAdd({...add, latitude: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="Longtitude"
                    value={add.longitude}
                    onChange={(e) => setAdd({...add, longitude: e.target.value})}
                />

                <input
                    type="text"
                    placeholder="Phone number"
                    value={add.number}
                    onChange={(e) => setAdd({...add, number: e.target.value})}
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
            await apiService.post('/delete-firestation', {id});
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const address = useDebounce(add.address, 3000);
    useEffect(() => {
         const handleGetLocation = async () => {
                try {
                    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
                    const response = await axios.get(geocodeUrl)
                    setAdd({...add, latitude: response.data.results[0].geometry.location.lat, longitude: response.data.results[0].geometry.location.lng});
                    console.log(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng);
                } catch (error) {
                    console.log(error);
                }
            }
        if(address){
            handleGetLocation();
        }
    }, [address])
    
  return (
    <div style={{overflow:'scroll', height:'100%'}}>
        <div style={{color:'orange', fontWeight:'bold', fontSize:'28px'}}>
            Fire stations
        </div>
        <Modal
            open={isOpenAdd}
            Content={ModalAddContent}
            Title='Add fire station'
        />
         <Modal
            open={isOpenUpdate}
            Content={ModalUpdateContent}
            Title='Update fire station'
        />
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px', alignItems:'center'}}>
            <div style={{display:'flex'}}>
             <div style={{marginTop:'13px', fontWeight:'bold', marginRight:'15px'}}>
                <div >
                    Filter by District
                </div>
               <SelectWithID
                    options={[{id:'',name:'ALL'},...districts]}
                    onChange={(e) => setFilter({...filter, district_id:e.target.value})}
                    field={'name'}
                    value={filter.district_id}
                />
            
            </div>
            <div style={{ marginTop:'13px', fontWeight:'bold'}}>
                <div >
                    Filter by Region
                </div>
               <SelectWithID
                    options={[{id:'',name:'ALL'},...region]}
                    onChange={(e) => setFilter({...filter, region_id: e.target.value})}
                    field={'name'}
                    value={filter.region_id}
                />
            
            </div>
            </div>
            <div>
            {parseInt(user.user_type_id) === 5 &&
            <button onClick={()=>setIsOpenAdd(true)}>
                Add
            </button>
            }
            </div>
        </div>
        <ReusableTable
            data={firestations}
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

export default Firestations