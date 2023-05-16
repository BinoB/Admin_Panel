import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import Footer from '../../Footer'
import LogoutModal from '../../LogoutModal'
import Navbar from '../../Navbar'
import ScrollToTop from '../../ScrollToTop'
import SidebarCards from '../../Sidebars/SidebarCards'


function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  
  const addProduct = () => {
    if (name.trim() !== "" && price.trim() !== "") {
      const newProduct = { id: Date.now(), name, price };
      const newProducts = [...products, newProduct];
      setProducts(newProducts);
      localStorage.setItem("products", JSON.stringify(newProducts));
      setName("");
      setPrice("");
        toast.success("Product added successfully!");
    } else {
        toast.error("Please fill in all the fields!");
    }
  };
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts.sort((a, b) => b.id - a.id)); // Sort in reverse order by id
  }, []);
  


  const deleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const editProduct = () => {
    const newProducts = products.map((product) => {
      if (product.id === selectedProductId) {
        return { ...product, name, price };
      }
      return product;
    });
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    setSelectedProductId(null);
    setName("");
    setPrice("");
  };

  const selectProductForEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setSelectedProductId(id);
    setName(product.name);
    setPrice(product.price);
  };

  //   Begin Pagination

  const productsPerPage = 5; // Number of products displayed per page.

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + productsPerPage;
  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  //   End Pagination
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const handleSidebar = () => {
    setSidebarToggle((prevSidebarToggle) => !prevSidebarToggle)
  }
  return (
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
          <h1>Products</h1>
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group" controlId="formName">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group" controlId="formPrice">
              <label for="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {selectedProductId ? (
              <button className="btn btn-primary" onClick={editProduct}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={addProduct}>
                Add
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="row my-3">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {currentProducts.map((product) =>  (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => selectProductForEdit(product.id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(product.id)}
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
  breakLabel="..."
  nextLabel="Next >"
  onPageChange={handlePageClick}
  pageRangeDisplayed={3}
  pageCount={pageCount}
  previousLabel="< Prev"
  renderOnZeroPageCount={null}
  containerClassName="pagination justify-content-center"
  activeClassName="active"
  pageClassName="page-item"
  pageLinkClassName="page-link"
  previousClassName="page-item"
  previousLinkClassName="page-link"
  nextClassName="page-item"
  nextLinkClassName="page-link"
  breakClassName="page-item"
  breakLinkClassName="page-link"
/>

        </div>
      </div>
    </div>
    </div>
    <Footer />
    </div>
    <ScrollToTop />
      <LogoutModal />
    </div>
  );
}

export default Product;
