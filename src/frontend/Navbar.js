 
 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../frontend/styles/Navbar.css';
 import { useRequests } from "../contexts/RequestsContext"; // Import the RequestsContext
 

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
const { requests } = useRequests();
 

    const [menuOpen, setMenuOpen] = useState(false);

    const [userName, setUserName] = useState('');
      
    const [selectedValue, setSelectedValue] = useState("");

    // image insert at regsiter 
    const [profileImage, setProfileImage] = useState('');
    // image update 
    const [file, setFile] = useState(null);

//    useEffect(() => {
//   const userData = JSON.parse(localStorage.getItem('user'));
//   if (userData && userData.name) {
//     setUserName(userData.name);
//     setProfileImage(userData.profileImage);
//   }
// }, []);
useEffect(() => {
  const handleUserUpdate = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.name) {
      setUserName(userData.name);
      setProfileImage(userData.profileImage);
    } else {
      setUserName('');
      setProfileImage('');
    }
  };

  // Load initially
  handleUserUpdate();

  // Listen for login/logout events
  window.addEventListener('user-updated', handleUserUpdate);

  return () => {
    window.removeEventListener('user-updated', handleUserUpdate);
  };
}, []);

 // Re-run whenever login status changes

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

  // account deletion 
  const handleDeleteUser = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('Account deleted successfully.');
      // or use navigate('/register') and then reload
       window.location.reload();
    } catch (err) {
      alert('Error deleting account');
      console.error(err);
    }
  };

//  profile image update
const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert('Please choose a file first.');
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/update-profile-image/${userId}`, formData);
      alert(res.data.msg);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setProfileImage(res.data.user.profileImage);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.msg || 'Upload failed');
    }
  };

    return (
        // <nav className="navbar">
        //     <div className="navbar-logo">WorkEase</div>
        //     <div className="navbar-links">
          <nav className="navbar">
    <div className="navbar-top">
      <div className="navbar-logo">WorkEase</div>
      
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>

    <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>

      {/* utill here */}
                <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/add-worker" onClick={() => setMenuOpen(false)}>Add Worker</Link>
                        <Link to="/search-worker" onClick={() => setMenuOpen(false)}>Search Worker</Link>
                        <Link to="/my-hires" onClick={() => setMenuOpen(false)}>My Hires</Link>
                        {userName && <span className="welcome-text">Welcome, {userName}</span>}
                       {profileImage && ( <img
                                         src={profileImage}
                                          alt="Profile"
                                           className="navbar-profile-image"
                                           />
                                            )}                    
          {/* for image update*/}
        <input type="file" accept="image/*" style={{ display: 'none' }} id="fileInput" onChange={handleFileChange}/>

        {/* this is only for testing purpose of dropdown change can work directky using button   */}
     <select
  className="user-dropdown"
  value={selectedValue}
  onChange={(e) => {
    const value = e.target.value;
   setSelectedValue(value);
    setMenuOpen(false); 
    setSelectedValue("");
    if (value === 'logout') {
      handleLogout();
       setSelectedValue("");
    } else if (value === 'DeleteUser') {
      // Handle delete user logic
      handleDeleteUser();
       setSelectedValue("");
      console.log('Delete user logic here');
    }
    // image update 
    else if (value === 'profileupdate') {
     document.getElementById('fileInput').click();
      setSelectedValue("");
      
    }
    else if (value === 'help') {
      // Handle help logic
      navigate('/contact');
       setSelectedValue("");
    }
    else if (value === 'myworker') {
      // Navigate to My Worker page
      navigate('/my-worker');
       setSelectedValue("");
    }
   }
    }
      >

  <option value="">Accounts</option>
  <option value="profileupdate">Profile Update</option>
  <option value="DeleteUser">Delete Account</option>
  <option value="help">Help</option>
  <option value="logout">Logout</option>


{/* add my worker  */}
<option value="myworker">Remove Worker</option>

</select>
{/* worker request  */}
{/* <Link
  to="/worker/requests"
  className={requests.length > 0 ? "pending-link" : "normal-link"}
>
  Hire Requests
</Link> */}
<Link
  to="/worker/requests"
  style={{
    color: requests?.length > 0 ? 'red' : 'white',
    fontWeight: requests?.length > 0 ? 'bold' : 'normal',
  }}
>
  <span>🔔</span>
  Requests
</Link>

{/* uptill here  */}

             {/* <button onClick={handleLogout} className="logout-btn">Logout</button> */}
             </>
                ) : (
                    <>
                        <Link to="/login"  onClick={() => setMenuOpen(false)}>Login</Link>
                        <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                    </>
                )}
            </div>
            {/* set and upload image */}

                {file && (
                <button onClick={handleUpload} className="upload-btn">
                    Upload
                </button>
            )}
        </nav>
    );
 

};

export default Navbar;
