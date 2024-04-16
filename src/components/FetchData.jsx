import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

function FetchData() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/fetchFile")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const exportData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/export", {
        responseType: "blob",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(response.data);
      link.setAttribute("download", "products.xlsx");
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading data:", error);
    }
  };

  const columns = [
    { field: "ProductName", headerName: "Product Name", width: 150 },
    { field: "ID", headerName: "ID", width: 90 },
    { field: "SKU", headerName: "SKU", width: 120 },
    { field: "VariantName", headerName: "Variant Name", width: 150 },
    { field: "Price", headerName: "Price", type: "number", width: 120 },
    {
      field: "DiscountedPrice",
      headerName: "Discounted Price",
      type: "number",
      width: 160,
    },
    { field: "Description", headerName: "Description", width: 250 },
  ];

  return (
    <div style={{ height: "90%", width: "100%" }}>

      <h3 className=" mb-2 text-center">Imported Data by User </h3>

      <DataGrid
        rows={products.map((product) => ({
          ...product,
          id: product.VariantID,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSize={5}
       
      />
      <Button variant="contained" className="mt-5" onClick={exportData}>
        Export Data
      </Button>
    </div>
  );
}

export default FetchData;
