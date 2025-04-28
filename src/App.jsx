import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import ImportFile from "./components/ImportFile";
import Filters from "./components/Filters";
import TableComponent from "./components/TableComponent";
import { useDispatch, useSelector } from "react-redux";
import { setExtractedData, setFilteredData, setIsLoading } from "./store/dataSlice";
import debounce from 'lodash.debounce'

function App() {
  const dispatch = useDispatch();
  const { extractedData, filteredData, isLoading } = useSelector(
    (state) => state.data
  );
  const [allFilters, setAllFilters] = useState({});
  const [sortingBy, setSortingBy] = useState("");
  const [sortingOrder, setSortingOrder] = useState("asc");

  useEffect(() => {
    const data = localStorage.getItem("extractedData");
    if (data) {
      dispatch(setExtractedData(JSON.parse(data)));
    }
  }, []);

  const applyFiltersAndSort = useCallback(debounce((filters, data, sortBy, sortOrder) => {
    dispatch(setIsLoading(true))
    let response = [...data];

    console.log({ filters })

    if(filters.category) response = response.filter(item => item.category === filters.category)
    if(filters.brand) response = response.filter(item => item.brand === filters.brand)
    if(filters.discounted) response = response.filter(item => item.is_discounted === filters.discounted)

      if(sortBy) {
        response = response.sort((a, b) => {
          let valueA = a[sortBy]
          let valueB = b[sortBy]

          if(sortBy === 'price' || sortBy === 'rating') {
            valueA = parseFloat(valueA)
            valueB = parseFloat(valueB)
          } else {
            valueA = valueA.toString().toLowerCase()
            valueB = valueB.toString().toLowerCase()
          }

          if(valueA < valueB) return sortOrder === 'asc' ? -1 : 1
          if(valueA > valueB) return sortOrder === 'asc' ? 1 : -1
          return 0
        })
      }
      console.log({ response })
      dispatch(setFilteredData(response))
      dispatch(setIsLoading(false))
  }, 200), [dispatch])

  useEffect(() => {
    applyFiltersAndSort(allFilters, extractedData, sortingBy, sortingOrder)
  }, [extractedData, allFilters, sortingBy, sortingOrder, applyFiltersAndSort])

  const filterOptions = useMemo(() => ({
    category: [...new Set(extractedData.map(item => item.category))],
    brand: [...new Set(extractedData.map(item => item.brand))],
  }), [extractedData])

  return (
    <div>
      {extractedData?.length === 0 ? (
        <ImportFile />
      ) : (
        <section>
          <Filters
            allFilters={allFilters}
            setAllFilters={setAllFilters}
            sortingBy={sortingBy}
            setSortingBy={setSortingBy}
            sortingOrder={sortingOrder}
            setSortingOrder={setSortingOrder}
            filterOptions={filterOptions}
          />
          {isLoading ? '' : (
            <TableComponent />
          )}
        </section>
      )}
    </div>
  );
}

export default App;
