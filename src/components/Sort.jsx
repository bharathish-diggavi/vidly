import { array, func, string } from "prop-types";

const Sort = ({
  items,
  selectedItem,
  textProperty,
  valueProperty,
  onItemSelect,
}) => {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty] ? item[valueProperty] : "default"}
            className={
              "list-group-item " +
              (selectedItem && selectedItem._id === item._id ? "active" : "")
            }
            onClick={() => onItemSelect(item)}
            style={{ cursor: "pointer" }}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};
Sort.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

Sort.propTypes = {
  items: array,
  textProperty: string,
  valueProperty: string,
  filterGenre: func,
};
export default Sort;
