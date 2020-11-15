
const JobCard = ({ jobTitle, jobType, company, jobLevel, location }) => {
    return (
        <div className="job-card d-flex flex-column flex-xl-row">
            <div className="job-info">
                <div className="job-type"><span className="badge bg-primary">{jobType}</span></div>
                <div className="job-title"><h2>{jobTitle}</h2></div>
                <div className="d-flex flex-column flex-lg-row">
                    <div className="job-company"><p>{company}</p></div>
                    <div className="job-location"><p>{location}</p></div>
                    <div className="job-level"><p> {jobLevel} </p></div>
                </div>
            </div>
            <div className="job-cta d-flex align-items-center justify-content-xl-center">
                <button className='btn btn-primary'>Apply now</button>
            </div>
        </div>
    )
}

export default JobCard
