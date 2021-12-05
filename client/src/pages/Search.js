import React from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import cardBackground from "../assets/cardBackground.jpg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  const context = React.useContext(AuthContext);
  const history = useHistory();
  const [searchedResults, setSearchedResult] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`/api/v1/user/search?q=${context.search}`, {
        headers: {
          "Content-Type": "multipart/form-data;",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchedResult(res.data);
      });
  }, [context.search]);
  const handleFollow = async (profileId) => {
    try {
      const res = await axios.post(
        `/api/v1/user/follow/${profileId}`,
        null,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        context.setUser({
          ...context.user,
          following: [...context.user.following, profileId],
        });
        const _searchedResults = [...searchedResults];
        const profileIndex = searchedResults.findIndex(
          (profile) => profile._id === profileId
        );
        _searchedResults[profileIndex].followers += 1;
        setSearchedResult([..._searchedResults]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="content">
      <div className="container">
        <div className="row">
          <div className="col-sm-12"> Search result </div>
          <br></br>
          <br></br>
        </div>
        <div className="row rowProfileCards">
          {searchedResults.map((searchedResult) => (
            <div className="itemCardProfile col-lg-4">
              <div className="text-center card-box">
                <div className="member-card pb-2">
                  <img className="card-img-profile-top" src={cardBackground} />
                  <div className="avatarCardSearch thumb-lg member-thumb mx-auto">
                    <img
                      src={`${searchedResult.picture}`}
                      className="rounded-circle img-thumbnail"
                      alt="profile-image"
                    />
                  </div>
                  <div className="searchProfileName">
                    <h4>{searchedResult.name}</h4>
                  </div>
                  <div className="mt-4">
                    <div className="row">
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>2563</h4>
                          <p className="mb-0 text-muted">Posts</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>25</h4>
                          <p className="mb-0 text-muted">Followers</p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mt-3">
                          <h4>30</h4>
                          <p className="mb-0 text-muted">Following</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleFollow(searchedResult._id)}
                      className="btn btn-default mt-3 btn-rounded waves-effect w-md waves-light"
                    >
                      <PersonAddIcon /> Follow
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        history.push(`/user/${searchedResult._id}`);
                      }}
                      className="btn btn-default mt-3 btn-rounded waves-effect w-md waves-light"
                    >
                      <VisibilityIcon /> View profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-right">
              <ul className="pagination pagination-split mt-0 float-right">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">«</span>{" "}
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">»</span>{" "}
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
