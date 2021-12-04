import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Card from "./card";
import "./cards.css";

import axios from "axios";
import Loader from "../loader/loader";
import { useParams } from "react-router-dom";

export default function Cards(props) {
  const [card, setCard] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  let history = useHistory();
  function handleChange(e, id) {
    history.push(`/details/${id}`);
  }

  const [page, setPage] = useState(0);
  const putSearch = (e) => {
    e.preventDefault();
    setPage(page + 1);
    window.scrollTo(0, 600);
  };

  const putSearchP = (e) => {
    e.preventDefault();
    setPage(page - 1);
    window.scrollTo(0, 600);
  };

  useEffect(async () => {
    axios
      .get(`/api/v1/card/all?page=${page}`, {
        headers: {
          "Content-Type": "multipart/form-data;",
          "x-auth-token": localStorage.getItem("token"),
        },
      })

      .then((res) => {
        setLoading(true);
        console.log(res.data);
        const data = res.data.reverse();
        setCard(data);
      })
      .catch((err) => err.message);
  }, [page]);

  const [limit, setLimit] = useState(6);
  const items = card.slice(0, limit);

  console.log(search);
  return (
    <div className="">
      <div className="items-c">
        <div className="cards-display">
          {loading ? (
            card.length > 0 ? (
              card.map(
                (c, index) => (
                  !c.place ? (c.place = "") : null,
                  !c.offer.includes("") ? c.offer.push("") : null,
                  c.region.includes(props.sregion) &&
                  c.place.includes(props.sPlace) &&
                  c.offer.includes(props.sOffer) ? (
                    <div>
                      {console.log("offer ", c.offer)}
                      <Card
                        key={index}
                        id={c._id}
                        place={c.place}
                        offer={c.offer}
                        website={c.website}
                        region={c.region}
                        picture={c.picture}
                        name={c.name}
                        description={c.description}
                        user={c.user}
                      />{" "}
                    </div>
                  ) : null
                )
              )
            ) : (
              <h1>Cards not found</h1>
            )
          ) : (
            <div className="cards-display">
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className="pagination">
        {page != 0 ? (
          <button className="btn-pag mr-5" onClick={(e) => putSearchP(e)}>
            <i class="bi bi-chevron-left"></i>
          </button>
        ) : null}

        {card.length == 20 ? (
          <button className="btn-pag-next" onClick={(e) => putSearch(e)}>
            <i class="bi bi-chevron-right"></i>
          </button>
        ) : null}
      </div>
    </div>
  );
}
