
const JobCard = ({ jobTitle, jobType, company }) => {
    return (
        <div className="job-card d-flex flex-column flex-xl-row">
            <div className="job-info">
                <div className="job-type"><span className="badge bg-primary">Part Time</span></div>
                <div className="job-title"><h2>Frontend Development</h2></div>
                <div className="d-flex flex-column flex-lg-row">
                    <div className="job-company"><p>Peuconomia International Pvt. Ltd.</p></div>
                    <div className="job-location"><p>Kathmandu,Nepal</p></div>
                    <div className="job-level"><p> Intermediate Level</p></div>
                </div>
            </div>
            <div className="job-cta d-flex align-items-center justify-content-xl-center">
                <button className='btn btn-primary'>Apply now</button>
            </div>
        </div>
    )
}

export default JobCard
