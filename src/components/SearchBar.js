const SearchBar = ({ value, onSearch }) => {

    const handleChange = event => {
        onSearch(event.target.value)
    }


    return (
        <form>
            <input type="text" value={value} placeholder='Rechercher' onChange={handleChange} />
        </form>
    );
}

export default SearchBar;
