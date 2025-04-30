import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setExtractedData, setFilteredData } from "../../store/dataSlice";

const Filters = ({ allFilters, setAllFilters, sortingBy, setSortingBy, sortingOrder, setSortingOrder, filterOptions,}) => {
  const categoryOptions = filterOptions.category.map((Categories) => ({
    value: Categories,
    label: Categories,
  }));
  const brandOptions = filterOptions.brand.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const discountedOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];
  const sortOptions = [
    { value: 'product_name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
  ];

    const dispatch = useDispatch();
  

  const onClearData = () => {
    localStorage.removeItem("extractedData");
    dispatch(setExtractedData([]));
    dispatch(setFilteredData([]))
  }
  return (
    <div className="flex justify-between items-center space-x-4 ">
      <div className="flex space-x-4 relative z-50">
        <Select
          options={categoryOptions}
          placeholder="Categories"
          isClearable
          onChange={(selectedOption) =>
            setAllFilters({
              ...allFilters,
              category: selectedOption?.value || "",
            })
          }
          styles={{
            control: (base) => ({
              ...base,
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              borderRadius: '10px',
              borderColor: '#D1D5DB',
              boxShadow: 'none',
              '&:hover': { borderColor: '#9CA3AF' },
            }),
            placeholder: (base) => ({
              ...base,
              color: '#9CA3AF',
              fontSize: '14px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#E5E7EB' : '#fff',
              color: '#111827',
              fontSize: '14px',
              padding: '10px 12px',
            }),
            singleValue: (base) => ({
              ...base,
              fontSize: '14px',
              color: '#111827',
            }),
          }}
         />
        <Select
          options={brandOptions}
          value={
            brandOptions.find((option) => option.value === allFilters.brand)
          }
          onChange={(selectedOption) =>
            setAllFilters({ ...allFilters, brand: selectedOption?.value || '' })
          }
          isClearable
          placeholder="Brands"
          styles={{
            control: (base) => ({
              ...base,
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              borderRadius: '10px',
              borderColor: '#D1D5DB', 
              boxShadow: 'none',
              '&:hover': { borderColor: '#9CA3AF' }, 
            }),
            placeholder: (base) => ({
              ...base,
              color: '#9CA3AF',
              fontSize: '14px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#E5E7EB' : '#fff', 
              color: '#111827', 
              fontSize: '14px',
              padding: '10px 12px',
            }),
            singleValue: (base) => ({
              ...base,
              fontSize: '14px',
              color: '#111827',
            }),
          }}
        />
        <Select
          options={discountedOptions}
          value={
            discountedOptions.find((opt) => opt.value === allFilters.discounted)
          }
          onChange={(selectedOption) =>
            setAllFilters({ ...allFilters, discounted: selectedOption?.value || '' })
          }
          isClearable
          placeholder="Discount"
          styles={{
            control: (base) => ({
              ...base,
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              borderRadius: '10px',
              borderColor: '#D1D5DB',
              boxShadow: 'none',
              '&:hover': { borderColor: '#9CA3AF' },
            }),
            placeholder: (base) => ({
              ...base,
              color: '#9CA3AF',
              fontSize: '14px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#E5E7EB' : '#fff',
              color: '#111827',
              fontSize: '14px',
              padding: '10px 12px',
            }),
            singleValue: (base) => ({
              ...base,
              fontSize: '14px',
              color: '#111827',
            }),
          }}
        />
      </div>
      <div className="flex space-x-4 items-center relative z-50">
        <Select
          options={sortOptions}
          value={
            sortOptions.find((opt) => opt.value === sortingBy)
          }
          onChange={(selectedOption) =>
            setSortingBy(selectedOption?.value || '')
          }
          isClearable
          placeholder="Sort by"
          styles={{
            control: (base) => ({
              ...base,
              paddingTop: '8px',
              paddingBottom: '8px',
              paddingLeft: '8px',
              paddingRight: '8px',
              borderRadius: '10px',
              borderColor: '#D1D5DB',
              boxShadow: 'none',
              '&:hover': { borderColor: '#9CA3AF' },
            }),
            placeholder: (base) => ({
              ...base,
              color: '#9CA3AF',
              fontSize: '14px',
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused ? '#E5E7EB' : '#fff',
              color: '#111827',
              fontSize: '14px',
              padding: '10px 12px',
            }),
            singleValue: (base) => ({
              ...base,
              fontSize: '14px',
              color: '#111827',
            }),
          }}
        />
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={sortingOrder === "asc"}
            className="sr-only peer"
            onClick={() =>
              setSortingOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 ">
            Order {sortingOrder}
          </span>
        </label>
        <button onClick={onClearData} className="p-2 bg-white rounded-full text-red-400 hover:text-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200">Clear </button>
      </div>
    </div>
  );
};

export default Filters;
