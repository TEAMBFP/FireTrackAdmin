/* eslint-disable react/prop-types */

export const SelectWithID = ({options,value, onChange, loading}) => {
  return (
 
    <select
        style={{height:'32px', backgroundColor:'#E8E9EC', width:'100%', fontSize:'16px'}}
        onChange={onChange}
        value={value}
    >
        
        {
        loading?
       
        
        <option>
            loading...
        </option>
        :
        options.length > 0 &&
            options.map((option)=>(
                <option key={option} value={option.id}>
                    {option.status}
                </option>
            ))
        }
    </select>

  )
}

export default SelectWithID