import { useAuth } from "../AuthContext";

export default function LikeButton({ onRequireLogin }) {
  const { token } = useAuth();

  const handleLike = () => {
    if (!token) {
      onRequireLogin();
      return;
    }

    alert("Song liked ❤️");
  };

  return <button onClick={handleLike}>❤️ Like</button>;
}
