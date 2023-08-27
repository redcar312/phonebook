const Form = ({ newNumber, setNewNumber, handleSubmit, handleNameChange }) => {
   
   
   
   
    return(
        <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit" onChange={handleNameChange}>add</button>
        </div>
      </form>
    )
}


export default Form