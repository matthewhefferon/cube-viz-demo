import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import cubejs from "@cubejs-client/core";
import moment from "moment";
import { QueryRenderer } from "@cubejs-client/react";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL,
});

const dateFormatter = (item) => moment(item).format("MMM YY");

export default function Bars() {
  return (
    <QueryRenderer
      query={{
        measures: ["MRR.MonthlyRecurringRevenue"],
        timeDimensions: [
          {
            dimension: "MRR.date",
            dateRange: ["2021-01-31", "2021-12-31"],
            granularity: "month",
          },
        ],
      }}
      cubejsApi={cubejsApi}
      render={({ resultSet }) => {
        if (!resultSet) {
          return "Loading...";
        }
        console.log(resultSet);

        return (
          <div className="p-5 flex space-x-5 mx-auto px-4 sm:px-6 lg:px-8 rounded-lg bg-white overflow-hidden shadow space-y-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={resultSet.chartPivot()}>
                <XAxis dataKey="x" tickFormatter={dateFormatter} />
                <YAxis />
                <Tooltip labelFormatter={dateFormatter} />
                <Bar dataKey="MRR.MonthlyRecurringRevenue" fill="#1ba8fb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }}
    />
  );
}
