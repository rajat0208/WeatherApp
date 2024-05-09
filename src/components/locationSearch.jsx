import { useState } from "react"
import getLatLong from '../services/weatherapi'
import { FaSearch } from "react-icons/fa";

const Search = ({ updateLocation }) => {
    const [location, setLocation] = useState("")
    const [latLong, setLatLong] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (location === "") {
            return 0;
        }
        else {
            const getData = async () => {
                // console.log(location)
                const data = await getLatLong(location)
                // console.log(data)
                setLatLong(data)
            }
            getData()
            // console.log(latLong)
            if (latLong) {
                updateLocation(
                    {
                        lat: latLong[0].lat,
                        long: latLong[0].long,
                        address: latLong[0].address,
                    }
                )
            }
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    };
    return (
        <>
            <div className="search-location">
                <form action="" onSubmit={handleSubmit} className="location">
                    <input type='text'
                        value={location}
                        name="location"
                        onChange={e => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Location" />
                    <button type="submit" className='search'><FaSearch /></button>
                </form>
            </div>


         
        </>
    )
}

export default Search