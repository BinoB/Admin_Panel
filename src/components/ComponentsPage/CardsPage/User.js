import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import Footer from '../../Footer'
import LogoutModal from '../../LogoutModal'
import Navbar from '../../Navbar'
import ScrollToTop from '../../ScrollToTop'
import SidebarCards from '../../Sidebars/SidebarCards'


function User() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  
  const addUser = () => {
    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      const newUser = { id: Date.now(), name, email, password };
      const newUsers = [...users, newUser];
      setUsers(newUsers);
      localStorage.setItem("users", JSON.stringify(newUsers));
      setName("");
      setEmail("");
      setPassword("");
        toast.success("User added successfully!");
    } else {
        toast.error("Please fill in all the fields!");
    }
  };
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers.sort((a, b) => b.id - a.id)); // Sort in reverse order by id
  }, []);
  


  const deleteUser = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const editUser = () => {
    const newUsers = users.map((user) => {
      if (user.id === selectedUserId) {
        return { ...user, name, email, password };
      }
      return user;
    });
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setSelectedUserId(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  const selectUserForEdit = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUserId(id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  };

  const pageCount = Math.ceil(users.length / usersPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  }
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const handleSidebar = () => {
    setSidebarToggle((prevSidebarToggle) => !prevSidebarToggle)
  }
  return (
    <>
    <div id="wrapper">
        <SidebarCards
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
          handleSidebar={handleSidebar}
        />
         <div id="content-wrapper" class="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Navbar
              sidebarToggle={sidebarToggle}
              setSidebarToggle={setSidebarToggle}
              handleSidebar={handleSidebar}
            />
      <div className="container">
        <div className="row">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="content-wrapper" className="mt-5">
              <div className="row">
                <div className="col-lg-12 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title font-weight-bold">Add User</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}

                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="col-md-4">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-md-12">
                            <button
                              type="button"
                              className="btn btn-success float-end"
                              onClick={selectedUserId !== null ? editUser : addUser}
                            >
                              {selectedUserId !== null ? "Save" : "Add User"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-4">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title font-weight-bold">Users List</h3>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users
                                .slice(pagesVisited, pagesVisited + usersPerPage)
                                .map((user) => (
                                  <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-primary me-2 mr-2"
                                        onClick={() => selectUserForEdit(user.id)}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => deleteUser(user.id)}
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <ReactPaginate
                          previousLabel={"Previous"}
                          nextLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={handlePageClick}
                          containerClassName={"pagination mt-4 justify-content-center"}
                          pageClassName={"page-item"}
                          pageLinkClassName={"page-link"}
                          activeClassName={"active"}
                          previousClassName={"page-item"}
                          nextClassName={"page-item"}
                          previousLinkClassName={"page-link"}
                          nextLinkClassName={"page-link"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    <ScrollToTop />
      <LogoutModal />
                                  
                                  </div>
      </>
);
}

export default User;      
