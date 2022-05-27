const useLocalPort = 8080
const forwardTo = "http://localhost:7700"
console.log(`taking requests to ${useLocalPort} and forwarding them to ${forwardTo}`)
const server = Deno.listen({ port: useLocalPort })

for await (const conn of server) { // for each connection
    serveHttp(conn)
}

async function serveHttp(conn) {
    for await (const requestEvent of Deno.serveHttp(conn)) { // for each request
        try {
            requestEvent.respondWith(
                await fetch(forwardTo, {
                    ...requestEvent.request,
                    mode: 'no-cors', // no-cors, *cors, same-origin
                })
            )
        } catch (error) {
            console.warn(error)
        }
    }
}