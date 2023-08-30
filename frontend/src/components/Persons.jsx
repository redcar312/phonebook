const Persons = ({ filterVal, filterArr, persons, handleDeletion}) => {
  

  
  
  
    return(
    <div>
            {filterVal?
           filterArr.map((data) => {
            return(<div>
            <p key={data.name}>{data.name}: {data.number}</p>
            <button onClick={() => handleDeletion(data.id)}>Delete</button>
            </div>)
           }) 
        
          :persons.map((person) => {
          return(
          <div>
          <p key={person.name}>{person.name}: {person.number}</p>
          <button onClick={() => handleDeletion(person.id)}>Delete</button>
            </div>
          )
        })}
    </div>
  )
} 

export default Persons