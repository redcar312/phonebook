const Persons = ({ filterVal, persons, handleDeletion}) => {
  const copyArr = [...persons]

  
  
  
    return(
    <div>
            {filterVal?
           copyArr.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase())).map((data) => {
            return(<div>
            <p key={data.id}>{data.name}: {data.number}</p>
            <button onClick={() => handleDeletion(data.id)}>Delete</button>
            </div>)
           }) 
        
          :copyArr.map((person) => {
          return(
          <div>
          <p key={person.id}>{person.name}: {person.number}</p>
          <button onClick={() => handleDeletion(person.id)}>Delete</button>
            </div>
          )
        })}
    </div>
  )
} 

export default Persons