import { useSelector } from "react-redux";

const Filters = ({ allFilters, setAllFilters, sortingBy, setSortingBy, sortingOrder, setSortingOrder, filterOptions }) => {
  return (
    <div className="flex justify-between items-center space-x-4 ">
      <div className="flex space-x-4">
        <select
          className="py-2 px-4 rounded-[10px] border-2 border-gray-800"
          onChange={(e) =>
            setAllFilters({ ...allFilters, category: e.target.value })
          }
        >
          <option value="">Categories</option>
          {filterOptions.category.map(
            (cat) => (
              <option key={cat}>{cat}</option>
            )
          )}
        </select>
        <select
          className="py-2 px-4 rounded-[10px] border-2 border-gray-800"
          onChange={(e) =>
            setAllFilters({ ...allFilters, brand: e.target.value })
          }
        >
          <option value="">Brands</option>
          {filterOptions.brand.map(
            (brand) => (
              <option key={brand}>{brand}</option>
            )
          )}
        </select>
        <select
          className="py-2 px-4 rounded-[10px] border-2 border-gray-800"
          onChange={(e) =>
            setAllFilters({ ...allFilters, discounted: e.target.value })
          }
        >
          <option value="">Discounted</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex space-x-4 items-center">
        <label className="text-[14px]" htmlFor="">
          Sort by:
        </label>
        <select
          className="py-2 px-4 rounded-[10px] border-2 border-gray-800"
          value={sortingBy}
          onChange={(e) => setSortingBy(e.target.value)}
        >
          <option value="">None</option>
          <option value="product_name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value={sortingOrder === "asc"}
            className="sr-only peer"
            onClick={() =>
              setSortingOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Order {sortingOrder}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Filters;
