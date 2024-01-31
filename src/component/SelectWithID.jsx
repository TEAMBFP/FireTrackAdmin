/* eslint-disable react/prop-types */

export const SelectWithID = ({options,value, onChange, loading, field, fontSize, required, disabled, width}) => {
  return (
 
    <select
        style={{height:'38px',  width:width, fontSize:fontSize, borderRadius:'8px', border:'1px solid black', outline:'none'}}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
    >
        
        {
        loading?
       
        
        <option>
            loading...
        </option>
        :
        options?.length > 0 &&
            options?.map((option)=>(
                <option key={option.id} value={option.id}>
                    {option[field]}
                </option>
            ))
        }
    </select>

  )
}

export default SelectWithID