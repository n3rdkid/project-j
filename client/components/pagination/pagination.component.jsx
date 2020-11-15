
import classnames from "classnames";
const Pagination = ({ page, setPage }) => {
    return (
        <nav aria-label="Page navigation">
            {console.log(page, page <= 1)}
            <ul class="pagination justify-content-center">
                <li className={classnames("page-item", { "disabled": page < 2 })} >
                    <button onClick={() => setPage((previousState, props) => previousState < 2 ? previousState : previousState - 1)} className="page-link" href="#" tabindex="-1">Previous</button>
                </li>
                {/* <li className="page-item"><button class="page-link" href="#">{page - 1}</button></li>
                <li className="page-item"><button class="page-link" href="#">{page}</button></li>
                <li className="page-item"><button class="page-link" href="#">{page + 1}</button></li> */}
                <li className="page-item">
                    <button className="page-link" href="#">Next</button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination
