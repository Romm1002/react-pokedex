const SearchBar = ({ value, onSearch }) => {

    const handleChange = event => {
        onSearch(event.target.value)
    }


    return (
        <div>
            <form id="searchBar" onSubmit={e => e.preventDefault()}>
                <input type="text" value={value} placeholder='Rechercher un pokémon...' onChange={handleChange} className="form-control" />
            </form>
            <hr></hr>
        </div>
    );
}

export default SearchBar;
