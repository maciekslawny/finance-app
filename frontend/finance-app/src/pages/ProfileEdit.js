import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

function ProfileEdit() {
  const [profileState, setProfileState] = useState({
    selected_currency: 0,
    goal_amount: 0,
    goal_currency: 0,
  });
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    axiosInstance.get("accounts/your-profile/1/").then((res) => {
      const newData = res.data;
      setProfileState(newData);
      console.log(res.data);
    });

    axiosInstance.get("api-data/currency").then((res) => {
      const newData = res.data;
      setCurrencyList(newData);
      console.log(res.data);
    });
  }, [setProfileState]);

  function handleSubmit() {
    console.log(profileState);
    axiosInstance
      .put(`accounts/your-profile/1/`, JSON.stringify(profileState))
      .then();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="m-5">
      <h3>Edit your profile</h3>

      <input
        type="selected_currency"
        className="form-control form-control-lg mb-2"
        placeholder="Enter goal amount"
        name="goal_amount"
        onChange={handleInputChange}
        value={profileState.goal_amount}
      ></input>
      <select
        name="goal_currency"
        onChange={handleInputChange}
        className="form-select form-select-lg mb-2"
        value={profileState.goal_currency}
      >
        <option>Select option</option>
        {currencyList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.symbol}
          </option>
        ))}
      </select>
      <select
        name="selected_currency"
        onChange={handleInputChange}
        className="form-select form-select-lg mb-2"
        value={profileState.selected_currency}
      >
        <option>Select option</option>
        {currencyList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.symbol}
          </option>
        ))}
      </select>


      <Button endIcon={<SaveIcon />} variant="contained" color="primary" onClick={handleSubmit}>
      Edit
      </Button>
    </div>
  );
}
export default ProfileEdit;
