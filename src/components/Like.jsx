const Like = ({ isLiked, onToggleLike }) => {
  return (
    <i
      className={"fa fa-heart" + (isLiked ? "" : "-o")}
      aria-hidden="true"
      onClick={onToggleLike}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
