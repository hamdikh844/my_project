import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);  
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Phone: '',
    Cin: '',
    Birthday: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/users')  
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:5000/users/${userId}`)
      .then(() => {
        setUsers(users.filter(user => user._id !== userId)); 
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = (userId) => {
    const user = users.find(u => u._id === userId);
    setEditingUser(userId); 
    setFormData({
      Username: user.Username,
      Email: user.Email,
      Phone: user.Phone,
      Cin: user.Cin,
      Birthday: user.Birthday,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/users/${editingUser}`, formData)
      .then(response => {
        setUsers(users.map(user => 
          user._id === editingUser ? response.data : user
        ));
        setEditingUser(null); 
        setFormData({ Username: '', Email: '', Phone: '', Cin: '', Birthday: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container">
      <h2 className="text-center my-4 gge">Admin Panel</h2>
      
      {editingUser && (
        <div className="mb-4">
          <h4>Edit User</h4>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="Username"
              className="form-control"
              value={formData.Username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="Email"
              className="form-control"
              value={formData.Email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="Phone"
              className="form-control"
              value={formData.Phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>CIN</label>
            <input
              type="text"
              name="Cin"
              className="form-control"
              value={formData.Cin}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input
              type="date"
              name="Birthday"
              className="form-control"
              value={formData.Birthday}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave} className="btn btn-success mt-2">Save</button>
          <button onClick={() => setEditingUser(null)} className="btn btn-secondary mt-2 mx-2">Cancel</button>
        </div>
      )}
      <div className="table-responsive bg-light">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className='text-center'>Username</th>
              <th className='text-center'>Email</th>
              <th className='text-center'>Phone</th>
              <th className='text-center'>CIN</th>
              <th className='text-center'>Birthday</th>
              <th className='bg-info text-light text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.Username}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.Cin}</td>
                <td>{user.Birthday}</td>
                <td>
                  <button onClick={() => handleUpdate(user._id)} className="btn btn-warning mx-2">Update</button>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link className="btn btn-outline-warning" to="/orders">OrdersList</Link>
      </div>
    </div>
  );
};

export default AdminPanel;