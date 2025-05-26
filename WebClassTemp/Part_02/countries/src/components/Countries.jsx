import Country from "./Country"

const Countries = ({ countries, filter, showCountry }) => {
    {/* const filterCountries = countries.every() */ }

    var filterCountries = []

    if (countries.length > 0) {
        filterCountries = countries.filter(country => country.name.common.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }

    if (filterCountries.length > 10) {
        return <p>Too many countries</p>
    }
    else if (filterCountries.length === 0) {
        return <p>No Countries</p>
    }
    else if (filterCountries.length === 1) {
        return (<Country country={filterCountries[0]} />)
    }
    else {
        return (
            <div>
                <p>Country count: {filterCountries.length}</p>
                <ul>
                    {filterCountries.map(country => (
                        <li
                            key={country.name.common}>
                            {country.name.common}
                            <button onClick={() =>showCountry(country.name.common)}>Show</button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Countries
