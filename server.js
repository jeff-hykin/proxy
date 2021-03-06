import { allKeys, ownKeyDescriptions, allKeyDescriptions, } from "https://deno.land/x/good@0.5.14/value.js"

const useLocalPort = 8080
const forwardTo = "http://localhost:7700/"
const serverHead = `http://134.209.57.254:${useLocalPort}/`
console.log(`taking requests to ${useLocalPort} and forwarding them to ${forwardTo}`)
const server = Deno.listen({ port: useLocalPort })


// curl \
//   -X POST 'http://134.209.57.254:8080/indexes/packages/search' \
//   -H 'Content-Type: application/json' \
//   --data-binary '{ "q": "ruby" }'

// curl \
//   -X GET 'http://134.209.57.254:8080/indexes/packages/settings/ranking-rules'

// curl \
//   -X POST 'http://134.209.57.254:8080/indexes/packages/settings/ranking-rules' \
//   -H 'Content-Type: application/json' \
//   --data-binary '["words","typo","exactness","proximity","attribute","sort"]'

// curl \
//   -X POST 'http://134.209.57.254:8080/indexes/packages/settings/searchable-attributes' \
//   -H 'Content-Type: application/json' \
//   --data-binary '[
//       "frozen.name"
//   ]'

// curl \
//   -X POST 'http://134.209.57.254:8080/indexes/packages/settings/searchable-attributes' \
//   -H 'Content-Type: application/json' \
//   --data-binary '[
//       "frozen.name",
//       "frozen.shortDescription"
//   ]'

// curl \
//   -X DELETE 'http://134.209.57.254:8080/indexes/packages/settings'

;((async ()=>{
    for await (const conn of server) { // for each connection
        serveHttp(conn)
    }
})())

async function serveHttp(conn) {
    let waiting = false
    for await (const { request, respondWith } of Deno.serveHttp(conn)) { // for each request
        try {
            // 
            // homepage
            // 
            if (request.url == serverHead) {
                await respondWith(
                    new Response(`
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="utf-8" />
                                <link rel="stylesheet" href="https://unpkg.com/css-baseline/css/4.css">
                            </head>
                            <body style="height: 100vh; overflow: auto; width: 99vw;">
                            </body>
                            <script> ;((async ()=>{
                                
                                
                                const indexName = "packages"
                                // Example POST method implementation:
                                async function post({data=null, to=null}) {
                                    // Default options are marked with *
                                    const response = await fetch(to, {
                                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                                        mode: 'cors', // no-cors, *cors, same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                            'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        redirect: 'follow', // manual, *follow, error
                                        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                                    })
                                    return response.json() // parses JSON response into native JavaScript objects
                                }
                                
                                // const post = ({data=null, to=null}) => new Promise(
                                //     function (resolve, reject) {
                                //         let the_request = new XMLHttpRequest()
                                //         the_request.onload = function () {
                                //             if (this.status >= 200 && this.status < 300) {
                                //                 try { var output_ = JSON.parse(the_request.responseText) }
                                //                 catch (error) { var output_ = the_request.responseText }
                                //                 resolve(output_)
                                //             }
                                //             else {
                                //                 reject({
                                //                         status: this.status,
                                //                         statusText: the_request.statusText
                                //                     })
                                //             }
                                //         }
                                //         the_request.onerror = function () {
                                //             reject({
                                //                     status: this.status,
                                //                     statusText: the_request.statusText
                                //                 })
                                //         }
                                //         the_request.open("POST", to, true)
                                //         the_request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
                                //         the_request.send(JSON.stringify(data))
                                //     })
                                
                                
                                window.search = ({
                                    q= null, //	Query string (mandatory)	""
                                    offset= 0, //	Number of documents to skip	0
                                    limit= 20, //	Maximum number of documents returned	20
                                    filter= null, //	Filter queries by an attribute's value	null
                                    facetsDistribution= null, //	Display the count of matches per facet	null
                                    attributesToRetrieve= ["*"], //	Attributes to display in the returned documents	["*"]
                                    attributesToCrop= null, //	Attributes whose values have to be cropped	null
                                    cropLength= 10, //	Maximum length of cropped value in words	10
                                    cropMarker= '???', //	String marking crop boundaries	"???"
                                    attributesToHighlight= null, //	Highlight matching terms contained in an attribute	null
                                    highlightPreTag= "<em>", //	String inserted at the start of a highlighted term	"<em>"
                                    highlightPostTag= "</em>", //	String inserted at the end of a highlighted term	"</em>"
                                    matches= false, //	Return matching terms location	false
                                    sort= null, //	Sort search results by an attribute's value	null
                                })=> post({
                                    data: {q,offset,limit},
                                    to:\`${serverHead}indexes/\${indexName}/search\`,
                                })
                                // post({ to: \`http://localhost:8080/indexes/\${indexName}/search\`, data: {
                                //     q,
                                //     offset,
                                //     limit,
                                //     filter,
                                //     facetsDistribution,
                                //     attributesToRetrieve,
                                //     attributesToCrop,
                                //     cropLength,
                                //     cropMarker,
                                //     attributesToHighlight,
                                //     highlightPreTag,
                                //     highlightPostTag,
                                //     matches,
                                //     sort,
                                // } })
                                
                                
                                var { Elemental, html } = await import("https://cdn.skypack.dev/@!!!!!/elemental@0.0.13")
                                var { Event, trigger, everyTime, once } = await import("https://deno.land/x/good@0.5.14/events.js")
                                var { zip } = await import("https://deno.land/x/good@0.5.14/array.js")
                                var { compare } = await import("https://deno.land/x/good@0.5.14/object.js")
                                var { capitalize, indent, toCamelCase, toPascalCase, toKebabCase, toSnakeCase, toScreamingtoKebabCase, toScreamingtoSnakeCase, toRepresentation, numberToEnglishArray } = await import("https://deno.land/x/good@0.5.11/string.js")
                                
                                // container helper
                                html = html.extend({
                                    container: ({style, children, ...props})=>html\`<div style=\${\`display: flex; flex-direction: column; justify-content: center; justify-items: center; align-items: center; \${style}\`} ...\${props} >
                                        \${children}
                                    </div>\`,
                                    row: ({style, children, ...props})=>html\`<div style=\${\`display: flex; flex-direction: row; justify-content: center; justify-items: center; align-items: center; \${style}\`} ...\${props} >
                                        \${children}
                                    </div>\`,
                                    attribute: ({style, children, name, value, ...props})=>html\`<span style="\${\`padding: 0.4rem; font-size: 1.1rem; \${style}\`}" ...\${props}>
                                        <span style="font-weight: bold;">\${name}:</span> \${value}
                                    </span>\`,
                                    codeBlock: ({style, children, ...props})=>html\`
                                        <code style="\${\`background: lightgray; border-radius: 4px; white-space: pre; overflow: auto; width: fit-content; padding: 1.2rem 0.3rem; \${style}\`}" ...\${props}>
                                            \${children}
                                        </code>
                                    \`,
                                    result: ({style, children, name, versions, ...props})=>{
                                        const versionsContainer = html\`
                                            <container style="align-items: flex-start; padding-left: 3rem;">
                                            </container>
                                        \`
                                        versions.sort((a,b)=>{
                                            a = a.frozen
                                            b = b.frozen
                                            let reverse = 1
                                            if (a.versionNumberList && b.versionNumberList) {
                                                // console.debug(\`a.versionNumberList is:\`,a.versionNumberList)
                                                // console.debug(\`b.versionNumberList is:\`,b.versionNumberList)
                                                const zipped = zip(a.versionNumberList, b.versionNumberList)
                                                // console.debug(\`zipped is:\`,zipped)
                                                for (let [aValue, bValue] of zip(a.versionNumberList, b.versionNumberList)) {
                                                    if (aValue-0 !== aValue-0) {
                                                        aValue = -Infinity
                                                    }
                                                    if (bValue-0 !== bValue-0) {
                                                        bValue = -Infinity
                                                    }
                                                    
                                                    if (aValue > bValue) {
                                                        console.log(\`a is bigger\`)
                                                        return 1 * reverse
                                                    }
                                                    if (bValue > aValue) {
                                                        console.log(\`b is bigger: \${bValue} > \${aValue}\`)
                                                        return -1 * reverse
                                                    }
                                                }
                                                return 0
                                            }
                                            if (a.versionNumberList instanceof Array) {
                                                return 1 * reverse
                                            }
                                            if (b.versionNumberList instanceof Array) {
                                                return -1 * reverse
                                            }
                                            return a.versionString.localeCompare(b)
                                        })
                                        for (const {frozen, flexible} of versions) {
                                            if (!frozen.name) {
                                                // TODO: add a codeBlock here
                                                return html\`<span>Malformed URL (no package name)</span>\`
                                            }
                                            // 
                                            // attribute name
                                            // 
                                            let newAttributeName = toSnakeCase(frozen.name.replace(/[^a-zA-Z_0-9]/g, "_"))
                                            const startingNumber = newAttributeName.match(/^\d+/) // if starts with a number, replace it with english
                                            if (startingNumber) {
                                                newAttributeName = newAttributeName.replace(startingNumber, numberToEnglishArray(startingNumber).join("_"))
                                            }
                                            
                                            // 
                                            // sort sources
                                            // 
                                            const sources = flexible.sources.sort(
                                                compare({
                                                    elementToNumber: element=>(new Date(element.date)).getTime(), // unix epoch ms
                                                    largestFirst: true,
                                                })
                                            )
                                            console.debug(\`sources is:\`,sources)
                                            const sourceElements = html\`
                                                <container style="align-items: flex-start; padding-left: 3rem;">
                                                </container>
                                            \`
                                            
                                            for (const each of sources) {
                                                const orginalAttributePath = each.attributePath.join(".")
                                                let nixEnvString
                                                let nixPackageString
                                                if (each.git) {
                                                    if (each.commit) {
                                                        if (each.git == "https://github.com/NixOS/nixpkgs.git" || each.git == "https://github.com/NixOS/nixpkgs") {
                                                            nixEnvString = \`nix-env -iA \${orginalAttributePath} -f 'https://github.com/NixOS/nixpkgs/archive/\${each.commit}.tar.gz'\`
                                                            nixPackageString = \`\${newAttributeName} = (import (builtins.fetchTarball { url = "https://github.com/NixOS/nixpkgs/archive/\${each.commit}.tar.gz"; }) {}).\${orginalAttributePath};\`
                                                        } else {
                                                            // FIXME: this is not reliable! not all git sources have a .tar url, but I'm not yet familiar with how to install from a git repo with nix-env
                                                            const url = each.git.replace(/\.git$/,"")
                                                            nixEnvString = \`nix-env -iA \${orginalAttributePath} -f '\${url}/archive/\${each.commit}.tar.gz'\`
                                                            nixPackageString = \`\${newAttributeName} = (import (builtins.fetchGit { url = "\${each.git}"; rev = "\${each.commit}"; }) {}).\${orginalAttributePath};\`
                                                        }
                                                    }
                                                }
                                                // TODO: add a link to the source code location, at least for github links. example attribute:             "position": "/nix/store/mxbb7j987b1v6y9qr408d10lrsp318b1-90cafaba3008311e8a15fce2a85e0f87e21b9815.tar.gz/pkgs/development/tools/misc/segger-ozone/default.nix:58",
                                                sourceElements.appendChild(html\`
                                                    <container style="align-items: flex-start; margin-bottom: 0.4rem;">
                                                        <span style="font-weight: bold;" >\${each.date}</span>
                                                        <container style="align-items: flex-start; padding-left: 2rem;">
                                                            <row style="margin-bottom: 0.4rem;">
                                                                <span style="width: 4.3rem;">Bash:</span>
                                                                <codeBlock style="padding: 0.4rem 0rem;">\${nixEnvString}</codeBlock>
                                                            </row>
                                                            <row>
                                                                <span style="width: 4.3rem;">Nix File:</span>
                                                                <codeBlock style="padding: 0.4rem 0rem;">\${nixPackageString}</codeBlock>
                                                            </row>
                                                        </container>
                                                    </container>
                                                \`)
                                            }
                                            versionsContainer.appendChild(html\`
                                                <container style="align-items: flex-start;">
                                                    <attribute name="Version" value=\${frozen.versionString} />
                                                    <details>
                                                        <summary>Sources</summary>
                                                        \${sourceElements}
                                                    </details> 
                                                    <details>
                                                        <summary>Frozen Info</summary>
                                                        <container style="align-items: flex-start;">
                                                            <codeBlock style="margin: 0.4rem;">
                                                                \${JSON.stringify(frozen,0,4)}
                                                            </codeBlock>
                                                        </container>
                                                    </details> 
                                                    <details>
                                                        <summary>Flexible Info</summary>
                                                        <container style="padding-left: 1rem; align-items: flex-start;">
                                                            <codeBlock style="margin: 0.4rem;">
                                                                \${JSON.stringify(flexible,0,4)}
                                                            </codeBlock>
                                                        </container>
                                                    </details> 
                                                </container>
                                            \`)
                                        }
                                        const element = html\`
                                            <container class="result" style="
                                                    align-items: flex-start;
                                                    width: 33rem;
                                                    height: fit-content;
                                                    background: white;
                                                    border-radius: 2rem;
                                                    padding: 2rem 1.3rem;
                                                    box-shadow: rgb(0 0 0 / 0%) -2px 0 1px 2px, rgb(0 0 0 / 12%) 0px 9px 33px -7px, rgb(0 0 0 / 20%) 0px 3px 15px -7px;
                                                    transition: all 0.5s ease-in-out 0s;
                                                    opacity: 0;
                                                    overflow: auto;
                                                    margin-bottom: 1.5rem;
                                                ">
                                                    <container style="padding: 1rem; align-items: flex-start;">
                                                        <attribute name="Name" value=\${name} />
                                                        <details>
                                                            <summary>Versions</summary>
                                                            \${versionsContainer}
                                                        </details> 
                                                    </container>
                                            </container>
                                        \`
                                        setTimeout(()=>element.style.opacity = 1, 1)
                                        return element
                                    },
                                })
                                
                                const event = {
                                    searchResultsReturned: new Event(),
                                }
                                

                                // export const input = ({style, children, ...props})=>html\`<input class="tutorialize-input" ...\${props} />\`
                                
                                let searchBox, resultsBox
                                const main = html\`
                                    <main style="width: 100%; background: whitesmoke; height: fit-content; min-height: 100%;">
                                        <style>
                                            code {
                                                white-space: pre;
                                                max-width: 85vw;
                                                overflow: auto;
                                            }
                                            summary {
                                                cursor: pointer;
                                                padding: 1rem;
                                                text-decoration: underline;
                                            }
                                        </style>
                                        <container style="height: 20vh; min-height: 12rem;">
                                        </container>
                                        <container>
                                            <h1 style="margin-bottom: 2rem; font-weight: thin;">Fornix</h1>
                                            <div>
                                                \${ searchBox = html\`
                                                    <input
                                                        style="width: 35rem; border-radius: 4px; box-shadow: rgb(0 0 0 / 0%) -2px 0 1px 2px, rgb(0 0 0 / 12%) 0px 9px 33px -7px, rgb(0 0 0 / 20%) 0px 3px 15px -7px;"
                                                        oninput=\${async()=>{
                                                            console.log(\`triggering search results for \${searchBox.value}\`)
                                                            searchBox.results = (await search({q:searchBox.value, limit: 200})).hits
                                                            console.debug(\`searchBox.results is:\`,searchBox.results)
                                                            const formattedResults = {}
                                                            for (const each of searchBox.results) {
                                                                formattedResults[each.frozen.name] = []
                                                            }
                                                            for (const each of searchBox.results) {
                                                                formattedResults[each.frozen.name].push(each)
                                                            }
                                                            searchBox.formattedResults = formattedResults
                                                            trigger(event.searchResultsReturned)
                                                        }}
                                                        />
                                                \`}
                                            </div>
                                                \${resultsBox = html\`
                                                    <container style="height: max-content; padding: 2rem;">
                                                        Results
                                                    </container>
                                                \`}
                                        </container>
                                    </main>
                                \`
                                document.body.appendChild(main)
                                
                                // snap to search
                                setTimeout(()=>searchBox.focus(), 10)
                                setTimeout(()=>searchBox.focus(), 100)
                                
                                everyTime(event.searchResultsReturned).then(()=>{
                                    resultsBox.innerHTML = ""
                                    for (const [key, each] of Object.entries(searchBox.formattedResults)) {
                                        resultsBox.appendChild(html\`<result name=\${key} versions=\${each}>\`)
                                    }
                                })
                                
                                function createResultElement(result) {
                                    
                                }
                            }))()</script>
                        </html>
                    `, {
                        status: 200,
                        headers: new Headers({
                            'content-type': 'text/html; charset=UTF-8'
                        }),
                    })
                )
            // 
            // database request
            // 
            } else {
                const useBody = !request.method.match(/GET|HEAD/)
                let body
                if (useBody) {
                    try { body = await request.text() } catch (error) {}
                }
                const result = await fetch(request.url.replace(serverHead, forwardTo), {
                    ...request,
                    ...(useBody ? {body} : {}),
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    method: request.method,
                    headers: Object.fromEntries(request.headers.entries()),
                    // {
                    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    //     mode: 'cors', // no-cors, *cors, same-origin
                    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    //     credentials: 'same-origin', // include, *same-origin, omit
                    //     headers: {
                    //         'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
                    //     },
                    //     redirect: 'follow', // manual, *follow, error
                    //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
                    // }
                })
                await respondWith(
                    result
                )
            }
        } catch (error) {
            console.warn(error)
        }
    }
}