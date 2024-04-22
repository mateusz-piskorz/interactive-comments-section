import { FC, useEffect, useState } from "react";
import { localStorageKey } from "../Login";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../services/user";
import { useAsync } from "../../hooks/useAsync";
import { CommentsProvider, useComment } from "../../context";
import { CommentList } from "../../features/CommentList";
import { Form } from "../../features/Form";

export const Home: FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem(localStorageKey);

    if (userId == null || userId == "") {
      navigate("/login");
    } else {
      setUser(JSON.parse(userId));
    }
  }, []);

  return <>{user && <CommentsSystem userId={user} />}</>;
};

const CommentsSystem: FC<{
  userId: string;
}> = ({ userId }) => {
  const { error, loading, resData } = useAsync(() =>
    getUserDetails({ userId })
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>getUserDetails error</h1>;
  }

  return (
    <CommentsProvider userDetails={resData}>
      <App />
    </CommentsProvider>
  );
};

const App: FC = () => {
  const { rootComments } = useComment();

  return (
    <>
      <CommentList comments={rootComments} nestingLevel={0}></CommentList>
      <Form operation="add" positionAbsolute />
    </>
  );
};
