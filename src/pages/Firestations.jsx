import React, { useEffect } from 'react'
import apiService from '../api'
import ReusableTable from '../component/ReusableTable/ReusableTable'
import Modal from '../component/Modal/Modal'
import Select from '../component/Select'

const cols = [
          {header: 'Address', field:'address' },
          {header: 'District', field:'district' },
          {header: 'Latitude', field: 'latitude'}, 
          {header: 'Longitude', field: 'longitude'}, 
          {header: 'Contact number', field: 'number'}, 
          {header: 'Action', field: 'action'}
        ]

const Firestations = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [firestations, setFirestations] = React.useState([]);
    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);
    const [isOpenAdd, setIsOpenAdd] = React.useState(false);
    const [edit, setEdit] = React.useState({
        id:'',
        address:'',
        latitude:'',
        longitude:'',
        number:'',
        district:''
    
    });
    const [add, setAdd] = React.useState({
        address:'', 
        latitude:'', 
        longitude:'', 
        number:'',
        district:'Cagayan de oro'
    });

    const [filter, setFilter] = React.useState('');

    useEffect(() => {
        const handleGetFirestations = async () => {
            try {
              
                const response = await apiService.get('/firestations?district='+filter);
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
                await apiService.post('/update-firestation', {
                    id: edit.id, 
                    address: edit.address, 
                    latitude: edit.latitude, 
                    longitude: edit.longitude, 
                    number: edit.number,
                    district: edit.district
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
              <div>
                <input
                    type="text"
                    placeholder="Address"
                    value={edit.address}
                    onChange={(e) => setEdit({...edit, address: e.target.value})}
                />

                 <Select
                    options={[ 'Cagayan de Oro','Misamis Oriental', 'Misamis Occidental', 
                        'Bukidnon', 'Camiguin', 'Lanao', 'Iligan']}
                    onChange={(e) => setEdit({...edit, district: e.target.value})}
                    value={edit.district}
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
                    placeholder="Number"
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
                await apiService.post('/create-firestation', {
                    address: add.address, 
                    latitude: add.latitude, 
                    longitude: add.longitude, 
                    number: add.number,
                    district: add.district
                });
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div>
                <input
                    type="text"
                    placeholder="Address"
                    value={add.address}
                    onChange={(e) => setAdd({...add, address: e.target.value})}
                />

                 <Select
                    options={[ 'Cagayan de Oro','Misamis Oriental', 'Misamis Occidental', 
                        'Bukidnon', 'Camiguin', 'Lanao', 'Iligan']}
                    onChange={(e) => setAdd({...add, district: e.target.value})}
                    value={add.district}
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
                    placeholder="Number"
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
    
  return (
    <div style={{overflow:'scroll', height:'100%'}}>
        <p style={{color:'orange', fontWeight:'bold', fontSize:'28px'}}>
              Fire stations
          </p>
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
             <div style={{width:'16%', marginTop:'13px', fontWeight:'bold'}}>
                <div >
                    Filter by district
                </div>
                <Select
                    options={[ 'All','Cagayan de Oro','Misamis Oriental', 'Misamis Occidental', 
                        'Bukidnon', 'Camiguin', 'Lanao', 'Iligan']}
                    onChange={(e) => setFilter(e.target.value === 'All' ? '' : e.target.value)}
                    value={filter}
                />
            </div>
            <div>
            {user.user_type_id === '5' &&
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
                if(user.user_type_id === '5')
                setIsOpenUpdate(true)
                setEdit(e)
            }}
            handleDelete={(id)=>handleDelete(id)}
        />
    </div>
  )
}

export default Firestations