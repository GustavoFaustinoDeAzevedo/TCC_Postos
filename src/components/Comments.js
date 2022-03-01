import { Comment, List } from "antd";
import { GetComments } from "../actions/generalActions";
import { useEffect } from "react";
import { useSelector, connect } from "react-redux";
function Comments(props) {
  const { comments } = useSelector((state) => state.general);

  useEffect(() => {
    props.dispatch(GetComments());
  }, []);

  console.log(comments);
  return (
    <List
      className="comment-list"
      header={`${comments.length} respostas`}
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={(item) => (
        <li>
          <Comment author={item.name} content={item.body} />
        </li>
      )}
    />
  );
}

export default connect()(Comments);
