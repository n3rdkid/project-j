
const JobTypeSidebar = ({ handleChange }) => {
    const options = [{
        label: "Part time"
    }, {
        label: "Full time"
    }, {
        label: "Internship"
    }, {
        label: "Temporary"
    }, {
        label: "Freelance"
    }
    ].map(({ label }) => <div className="form-check" key={label}>
        <label className="form-check-label" htmlFor={label}>
            {label}
        </label>
        <input onChange={handleChange} className="form-check-input" type="checkbox" name="type" value={label} id={label} />
    </div>)
    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Browse category</h3>
            <form>
                {options}
            </form>
        </div>

    )
}

export default JobTypeSidebar
