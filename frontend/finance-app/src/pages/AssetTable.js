import { Link } from "react-router-dom";
import axiosInstance from "../axios";

const operation = {
  name: "Kebabik",
  amount: 50,
  operation: "expense",
};

function AssetTable(props) {
  function handleDelete(item_id) {
    axiosInstance.delete(`finances/asset/${item_id}`).then();
    console.log("deleted item", item_id);
  }

  return (
    <div className="container">
      <h1>Asset</h1>
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Amount</th>
            <th scope="col">Value [USD]</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.items.assets).map((asset_category) => {
            return Object.entries(asset_category[1]).map((asset_type) => (
              <tr key={asset_type[0]}>
                <th scope="row"></th>
                <td>{asset_type[0]}</td>
                <td>{asset_category[0]}</td>
                <td>{asset_type[1].amount}</td>
                <td>{asset_type[1].value}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
      <h4>Total value: {props.items.assets_value} USD</h4>
      <h2>Asset transaction</h2>{" "}
      <Link className="btn btn-success" to={`/asset/add`}>
        Add new
      </Link>
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.assetList.map((item) => (
            <tr key={item.id}>
              <th scope="row"></th>
              <td>{item.tag}</td>
              <td>{item.category_name}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>
                <Link className="btn btn-warning" to={`/asset/${item.id}`}>
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetTable;
