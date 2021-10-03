
import classnames from "classnames";
const Pagination = ({ page, setPage, totalPages }) => {
    const pageDifference = totalPages - page;
    return (
        <nav aria-label="Page navigation">
            {console.log(page, totalPages, page < totalPages)}
            <ul class="pagination justify-content-center">
                <li className={classnames("page-item", { "disabled": page < 2 })} >
                    <button onClick={() => setPage((previousState, props) => previousState < 2 ? previousState : previousState - 1)} className="page-link" href="#" tabindex="-1">Previous</button>
                </li>

                {page <= 1 ? "" : <li className="page-item" >
                    <button onClick={() => setPage(1)} className="page-link">1</button>
                </li>}
                {page >= 1 && page - 1 <= 2 ? "" :
                    <li className="page-item" >
                        <button className="page-link" onClick={() => setPage(Math.round((page - 1) / 2))}>...</button>
                    </li>
                }
                {page < 2 || page - 1 < 2 ? "" : <li className="page-item" >
                    <button onClick={() => setPage((previousState, props) => previousState - 1)} className="page-link">{page - 1}</button>
                </li>}
                <li className="page-item active" >
                    <button className="page-link" >{page}</button>
                </li>

                {page + 1 >= totalPages || pageDifference + 1 < 2 ? "" : <li className="page-item" >
                    <button onClick={() => setPage((previousState, props) => previousState + 1)} className="page-link">{page + 1}</button>
                </li>}
                {pageDifference < 3 ? "" :
                    <li className="page-item" >
                        <button className="page-link" onClick={() => setPage(Math.min(Math.round(page + pageDifference / 2), totalPages))}>...</button>
                    </li>
                }
                {page === totalPages ? "" : <li className="page-item" >
                    <button onClick={() => setPage(totalPages)} className="page-link">{totalPages}</button>
                </li>}

                <li className={classnames("page-item", { "disabled": page >= totalPages })} >
                    <button onClick={() => setPage((previousState, props) => page >= totalPages ? previousState : previousState + 1)} className="page-link" href="#" tabindex="-1">Next</button>
                </li>
            </ul>
        </nav>

    )
}

export default Pagination
