import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import _map from "lodash/map";

import {
  getLoggedActivities,
  deleteLoggedActivity
} from "../action/loggedActivityAction";
import { ApplicationState } from "../../../../configureStore";
import { Activity } from "../types/types";

const LoggedActivities = () => {
  const dispatch = useDispatch();
  const loggedActivities = useSelector(({ activity }: ApplicationState) => ({
    activities: activity ? activity.activities.activities : {},
    pagination: activity
      ? activity.activities.pagination
      : {
          beforeDate: "",
          limit: 5,
          next: "",
          offset: 0,
          previous: "",
          sort: "asc"
        }
  }));
  console.log(loggedActivities.pagination.next);
  useEffect(() => {
    dispatch(getLoggedActivities());
  }, [dispatch]);

  const deleteLoggedActivityUsingLogId = (logId: number) => async (
    event: any
  ) => {
    await dispatch(deleteLoggedActivity(logId));

    dispatch(getLoggedActivities());
  };

  const handlePreviousClick = () => {
    if (loggedActivities.pagination.previous !== "") {
      dispatch(getLoggedActivities(loggedActivities.pagination.previous));
    }
  };

  const handleNextClick = () => {
    if (loggedActivities.pagination.next !== "") {
      dispatch(getLoggedActivities(loggedActivities.pagination.next));
    }
  };

  const renderActivities = (activity: Activity) => {
    return (
      <tr key={activity.logId}>
        <td>{activity.activityName}</td>
        <td>{activity.activeDuration}</td>
        <td>{activity.calories}</td>
        <td>{activity.distance}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            onClick={deleteLoggedActivityUsingLogId(activity.logId)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Active Duration</th>
            <th>Calories</th>
            <th>Distance</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{_map(loggedActivities.activities, renderActivities)}</tbody>
      </Table>

      <Button
        color="secondary"
        onClick={handlePreviousClick}
        disabled={loggedActivities.pagination.previous === "" ? true : false}
      >
        Previous
      </Button>
      <Button
        color="secondary"
        onClick={handleNextClick}
        disabled={loggedActivities.pagination.next === "" ? true : false}
      >
        Next
      </Button>
    </>
  );
};

export default LoggedActivities;
