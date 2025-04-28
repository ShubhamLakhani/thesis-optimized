import { useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
const TableComponent = () => {
  const { extractedData, filteredData } = useSelector((state) => state.data);

  console.log({ filteredData });

  if (!filteredData.length) return <p>No Data Found</p>;

  const columns = Object.keys(filteredData[0]);

  const DataRow = ({ index }) => (
    <tr className=" hover:bg-gray-50 align-middle">
      {columns.map((column, i) => (
        <td className="px-4 py-4 border-b text-left" key={i}>
          {filteredData[index][column]?.toString().startsWith("http") ? (
            <img
              src={filteredData[index][column]}
              alt="img"
              width="150"
              height="150"
              className="rounded-full object-cover"
            />
          ) : (
            <p className="text-gray-700 text-sm">{filteredData[index][column]}</p>
          )}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="mt-8">
      {/* <table className="min-w-full table-auto border-collapse text-sm text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {filteredData.length > 0 &&
              Object.keys(filteredData[0]).map((key) => (
                <th className="p-4" key={key}>
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, idx) => (
            <tr className="border-b" key={idx}>
              {Object.values(item).map((val, i) => (
                <td className="p-4 text-xs text-white" key={i}>
                  {val?.toString().startsWith("http") ? (
                    <img
                      src={val}
                      alt="img"
                      width="50"
                      height="50"
                      className="rounded-full"
                    />
                  ) : (
                    val
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
      <List
        className="mt-8"
        height={800}
        itemCount={filteredData.length}
        itemSize={50}
        width='100%'
      >
        {DataRow}
      </List>
    </div>
  );
};

export default TableComponent;
