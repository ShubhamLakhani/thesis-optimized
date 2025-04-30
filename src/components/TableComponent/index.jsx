import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useSelector } from "react-redux";

const TableComponent = () => {
  const { filteredData } = useSelector((state) => state.data);
  const parentRef = useRef();

  const columns = filteredData.length ? Object.keys(filteredData[0]) : [];

  const virtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 95,
    overscan: 10,
  });

  return (
    <div className="mt-8">
      {/* Header */}
      <div
        className="grid sticky top-0 z-10 bg-gray-100 text-sm font-semibold border-b"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col, idx) => (
          <div key={idx} className="p-4 text-left text-gray-700">
            {col}
          </div>
        ))}
      </div>

      {/* Virtualized body */}
      <div
        ref={parentRef}
        style={{
          height: "740px",
          overflow: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = filteredData[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                role="row"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                }}
                className="border-b hover:bg-gray-50"
              >
                {columns.map((column, colIdx) => (
                  <div key={colIdx} className="p-4 flex items-center justify-center h-full">
                    {item[column]?.toString().startsWith("http") ? (
                      <img
                        loading="lazy"
                        src={item[column]}
                        alt="img"
                        width="50"
                        height="50"
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-700 items-center">
                        {column === "is_discounted"
                          ? item[column].toString() === "true"
                            ? "Yes"
                            : "No"
                          : item[column]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
