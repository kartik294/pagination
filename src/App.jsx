import { useEffect, useState } from 'react'


function App() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  const [userPerPage] = useState(10);

  const getUserDetails = async () => {
    try {
      const data = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const dataJson = await data.json();
      setUsers(dataJson);
      console.log(dataJson)
    } catch (error) { 
      console.error("failed to fetch data",error);
      window.alert("failed to fetch data");
    }  
  }

  useEffect(() => {
    getUserDetails();
  }, [])

  //calculate the total number of pages.
  const totalPage = Math.ceil(users.length / userPerPage);

  //get the user for current page.
  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * userPerPage;
    const endIndex = startIndex + userPerPage;
    return users.slice(startIndex, endIndex);
  }

  const handlePreviousPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if(currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <div className='app'>
        <table className='table'>
          <thead className='head-row'>
            {/* <tr className='head-row'> */}
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            {/* </tr> */}
          </thead>
          <tbody className='tbody'>
          {getPaginatedUsers().map((user) => (
             <tr className='data-row' key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className='pagination'>
          <button onClick={handlePreviousPage} className='prevPage'>Previous</button>
          <div className='pageNo'>{currentPage}</div>
          <button onClick={handleNextPage} className='nextPage'>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
