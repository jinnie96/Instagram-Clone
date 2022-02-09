import { Link } from "react-router-dom";
import "./handle404.css";
function Handle404() {
  return (
    <>
      <div className="handle404">
        <p>
          Oops! Wrong way! Return to&nbsp;
          <Link to="/posts">Feed!</Link>{" "}
        </p>
      </div>
    </>
  );
}

export default Handle404;
