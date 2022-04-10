import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const operation = {
  name: "Kebabik",
  amount: 50,
  operation: "expense",
};

function WalletTable(props) {
  let navigate = useNavigate();
  function handleDelete(item_id) {
    const res = axiosInstance.delete(`finances/operations/${item_id}`).then();

    console.log("deleted item", item_id, res.status);
  }

  return (
    <div className="container">
      <Link className="btn btn-success" to={`/wallet/add`}>
        Add new
      </Link>
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
            <th scope="col">Rev/Exp</th>
            <th scope="col">Date</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.operation_type}</td>
              <td>{item.operation_date}</td>
              <td>
                <Link
                  className="btn btn-sm btn-warning me-1"
                  to={`/wallet/${item.id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
   


  <Pagination count={props.totalPages} page={props.pageNum} onChange={(event, value) => props.setPageNum(value)} />


      <p>SUM: {props.items[0] && props.items[0].get_sum}</p>
    </div>
  );
}

export default WalletTable;
