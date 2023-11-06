import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById, postRating } from "../redux/actions";

export const useDetail = () => {
  const detail = useSelector((state) => state.movieById);
  const userData = JSON.parse(window.localStorage.getItem("user"));
  const [activeTrailer, setActiveTrailer] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleClickDate = (day) => {
    if (selectedDay === day) {
      setSelectedDay(null);
      setSelectedShow(null);
    } else {
      setSelectedDay(day);
      setSelectedShow(null);
    }
  };

  const handleClickShow = (show) => {
    if (selectedShow === show) {
      setSelectedShow(null);
    } else {
      setSelectedShow(show);
      const storedMovie = JSON.parse(window.localStorage.getItem("movie"));
      if (storedMovie) {
        const updatedMovie = {
          ...storedMovie,
          showId: show,
        };
        window.localStorage.setItem("movie", JSON.stringify(updatedMovie));
      }
    }
  };

  const handleChangeRating = (count) => {
    if (!userData) {
      toast.dismiss(); // Limpiar la alerta existente si hay alguna
      toast.error("Inicia sesión para poder valorar", {
        duration: 3000,
      });
      return;
    } else {
      dispatch(postRating({ movieId: detail.id, count }));
      setRating(count);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMovieById(id));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();

    /*     return () => dispatch(cleanDetail()); */
  }, [id, dispatch]);

  useEffect(() => {
    if (detail.shows && detail.shows.length > 0) {
      const firstDay = detail.shows[0].date;
      handleClickDate(firstDay);
    }
  }, [detail.shows]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/ticket");
    }
  };

  return {
    detail,
    activeTrailer,
    setActiveTrailer,
    rating,
    selectedDay,
    selectedShow,
    loading,
    handleClickDate,
    handleClickShow,
    handleChangeRating,
    handleSubmit,
  };
};
