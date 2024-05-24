import { useState, useEffect } from "react";
import { fetchArticlesWithTopic } from "./articles-api";
import SearchForm from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import Error from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchArticlesWithTopic(query, page);
        setArticles((prevArticles) =>
          page === 1 ? data : [...prevArticles, ...data]
        );
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query, page]);

  const handleSearch = (topic) => {
    setArticles([]);
    setError(false);
    setQuery(topic);
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      {error && (
        <Error message="Something went wrong. Please try again later." />
      )}
      {articles.length > 0 && (
        <>
          <ImageGallery items={articles} onImageClick={openModal} />
          <LoadMoreBtn onClick={loadMore} loading={loading} />
        </>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;

// Application ID    614696

// Access Key   4DRL2zuvY1q - KRaEaDp3GrlWHWl2 - TXIdUQy05dZwR8

// Secret key   l8c9-nQ8aGBv6eHXuJXYTqvSNRG0vrXB3jYWsRLNTPY
