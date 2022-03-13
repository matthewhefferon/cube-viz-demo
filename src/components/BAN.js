import React from "react";
import { QueryRenderer } from "@cubejs-client/react";

const BAN = ({ cubejsApi, query, render }) => (
  <QueryRenderer
    query={query}
    cubejsApi={cubejsApi}
    render={({ resultSet }) => {
      if (!resultSet) {
        return <div className="loader" />;
      }

      return render(resultSet);
    }}
  />
);

export default BAN;
