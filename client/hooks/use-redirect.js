import Router from "next/router"
const useRedirect = ({ context, href }) => {
    if (context && context.req) {
        context.res.writeHead(302, { Location: href })
        context.res.end()
    } else {
        Router.push(href)
    }
}
export default useRedirect;