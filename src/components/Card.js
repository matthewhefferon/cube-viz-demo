import cubejs from "@cubejs-client/core";
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import BAN from "./BAN";

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_API_URL,
});

const renderSingleValue = (resultSet, key) => (
  <div className="Card">
    <h1>{resultSet.chartPivot()[0][key]}</h1>
  </div>
);

const stats = [
  {
    name: "Annual Run Rate (ARR)",
    stat: (
      <BAN
        cubejsApi={cubejsApi}
        query={{ measures: ["MRR.AnnualRunRate"] }}
        render={(resultSet) =>
          renderSingleValue(resultSet, "MRR.AnnualRunRate")
        }
      />
    ),
    change: "12%",
    changeType: "increase",
  },
  {
    name: "Avg. Revenue per Account (ARPA)",
    stat: (
      <BAN
        cubejsApi={cubejsApi}
        query={{ measures: ["MRR.AverageRevenuePerAccount"] }}
        render={(resultSet) =>
          renderSingleValue(resultSet, "MRR.AverageRevenuePerAccount")
        }
      />
    ),
    change: "2%",
    changeType: "increase",
  },
  {
    name: "Customer Lifetime Value (CLV)",
    stat: (
      <BAN
        cubejsApi={cubejsApi}
        query={{ measures: ["MRR.CustomerLifetimeValue"] }}
        render={(resultSet) =>
          renderSingleValue(resultSet, "MRR.CustomerLifetimeValue")
        }
      />
    ),
    change: "4%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Proof of Concept: Cube + React
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-[#1ba8fb]">$
                {item.stat}
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
