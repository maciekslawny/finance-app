import { useEffect, useState } from "react";
import axiosInstance from "../axios";

function Dashboard() {
  const [appState, setAppState] = useState({
    data: {
      balance: 0,
      goal_progress: 0,
    },
  });

  useEffect(() => {
    axiosInstance.get("finances/asset-info").then((res) => {
      const newData = res.data;
      setAppState({ loading: false, data: newData });
      console.log(res.data);
    });
  }, [setAppState]);

  if (appState.data != null) {
    console.log("tutaj", appState.data.balance);
  }

  return (
    <div className="m-5">
      <h1>Welcome to your dashboard!</h1>

      <div className="card text-center">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">The whole balance</h5>
          {appState.data != null && (
            <h4 className="card-text">
              <b>
                {appState.data.balance} {appState.data.balance_currency}
              </b>
            </h4>
          )}
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>

        <h3 className="card-title">
          <b>YOUR GOAL:</b>
        </h3>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-success"
            role="progressbar"
            style={{ width: appState.data.goal_progress }}
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {appState.data.goal_progress}
          </div>
        </div>

        <div className="card-footer text-muted">
          {appState.data.balance_in_goal_currency} {appState.data.goal_currency}{" "}
          / {appState.data.goal_amount} {appState.data.goal_currency}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
