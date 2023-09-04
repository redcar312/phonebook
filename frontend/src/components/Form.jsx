const Form = ({ newNumber, setNewNumber, handleSubmit, newName, handleNameChange }) => {
   
   
   
   
    return(
        <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="tel" value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit" onChange={handleNameChange}>add</button>
        </div>
      </form>
    )
}


export default Form