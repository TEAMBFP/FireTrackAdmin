/* eslint-disable react/prop-types */

export const SelectWithID = ({options,value, onChange, loading, field, fontSize, required, disabled}) => {
  return (
 
    <select
         style={{height:'38px',  width:'100%', fontSize:fontSize, borderRadius:'8px', border:'1px solid black', outline:'none'}}
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
        options.length > 0 &&
            options.map((option)=>(
                <option key={option} value={option.id}>
                    {option[field]}
                </option>
            ))
        }
    </select>

  )
}

export default SelectWithID