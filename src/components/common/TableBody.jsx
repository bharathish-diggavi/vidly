import _ from "lodash";
// movies : Table body
//onLike
//onDelte
const TableBody = ({ data, columns }) => {
  // renderCell = (item, column) => {
  //     if()
  // }

  const generateKey = (key, column) => {
    console.log(key._id + (column.path || column.key));
    return key._id + (column.path || column.key);to
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) =>
            column.content ? (
              <td>{column.content(item)}</td>
            ) : (
              <td key={generateKey(item, column)}>
                {_.get(item, column.path)}
              </td>
            )
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
