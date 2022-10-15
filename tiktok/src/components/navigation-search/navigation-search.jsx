import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../../hooks/pageContext";
import searchIcon from "../../assets/svgs/search.svg";
import "./navigation-search.styles.scss";

const NavigationSearch = ({ }) => {
    const navigate = useNavigate();
    const page = usePageContext();
    const [search, setSearch] = useState("");

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        if (page === "Search" && search) {
            navigate(`/search/${search}`)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (search) {
            navigate(`/search/${search}`)
        }
    }

    return (
        <div>
            <form className="navigation-search" onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search accounts and videos"
                    onChange={handleSearchChange}
                    value={search}
                />
                <button><img src={searchIcon} alt="search" /></button>
            </form>
        </div>
    );
};

export default NavigationSearch;
