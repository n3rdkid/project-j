
const JobLevelSidebar = ({ handleChange }) => {
    const options = [{
        label: "Internship/Trainee"
    }, {
        label: "Entry Level"
    }, {
        label: "Intermediate Level"
    }, {
        label: "Senior Level"
    }
    ].map(({ label }) => <div className="form-check" key={label}>
        <label className="form-check-label" htmlFor={label}>
            {label}
        </label>
        <input onChange={handleChange} className="form-check-input" type="checkbox" name="type" value={label} id={label} />
    </div>)
    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Browse Level</h3>
            <form>
                {options}
            </form>
        </div>

    )
}

export default JobLevelSidebar
