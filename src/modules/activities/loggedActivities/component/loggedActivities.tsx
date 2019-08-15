import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Container } from "reactstrap";
import _map from "lodash/map";
import DatePicker from "react-datepicker";

import {
  getLoggedActivities,
  deleteLoggedActivity
} from "../action/loggedActivityAction";
import { ApplicationState } from "../../../../configureStore";
import { Activity } from "../types/types";

const LoggedActivities = () => {
  const [beforeDate, setBeforeDate] = useState(new Date());
  const [afterDate, setAfterDate] = useState(new Date());
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
  let url =
    "https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=" +
    formatDate(beforeDate) +
    "&sort=desc&limit=5&offset=0";
  useEffect(() => {
    dispatch(getLoggedActivities(url));
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

  const changeBeforeDate = (date: Date) => {
    setBeforeDate(date);
    let url =
      "https://api.fitbit.com/1/user/-/activities/list.json?beforeDate=" +
      formatDate(date) +
      "&afterDate=" +
      "&sort=desc&limit=5&offset=0";
    dispatch(getLoggedActivities(url));
  };

  const changeAfterDate = (date: Date) => {
    setAfterDate(date);
    let url =
      "https://api.fitbit.com/1/user/-/activities/list.json?afterDate=" +
      formatDate(afterDate) +
      "&sort=desc&limit=5&offset=0";
    dispatch(getLoggedActivities(url));
  };

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
    <Container fluid>
      <div className="mb-4 mt-4">
        <label className="mr-2 ml-4">Before date</label>
        <DatePicker
          selected={beforeDate}
          onChange={changeBeforeDate}
          maxDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
        <label className="ml-4 mr-2">After date</label>
        <DatePicker
          selected={beforeDate}
          onChange={changeAfterDate}
          maxDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
      </div>
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
    </Container>
  );
};

export default LoggedActivities;
