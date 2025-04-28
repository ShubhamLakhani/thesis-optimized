import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useSelector } from "react-redux";

const TableComponent = () => {
  const { filteredData } = useSelector((state) => state.data);
  const mainRef = useRef();

  const columns = filteredData.length ? Object.keys(filteredData[0]) : [];

  const dataVisualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => mainRef.current,
    estimateSize: () => 95,
    overscan: 10,
  });


  return (
    <div className="mt-8">
      <div
        ref={mainRef}
        style={{
          height: "800px",
          overflow: "auto",
        }}
      >
        <table className="min-w-full table-auto border-collapse text-sm text-left">
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
          <tbody
            style={{
              position: "relative",
              height: `${dataVisualizer.getTotalSize()}px`,
            }}
          >
            {dataVisualizer.getVirtualItems().map((i) => {
              const item = filteredData[i.index];
              return (
                <tr
                  key={i.key}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${i.start}px)`,
                  }}
                  className="hover:bg-gray-50 align-middle border-b"
                >
                  {columns.map((column, i) => (
                    <td
                      className="px-4 py-4 text-gray-700 border-b text-left"
                      key={i}
                    >
                      {item[column]?.toString().startsWith("http") ? (
                        <img
                          loading="lazy"
                          src={item[column]}
                          alt="img"
                          width="150"
                          height="150"
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-700 text-sm">{item[column]}</p>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
