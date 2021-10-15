import { getAssetFromKV, NotFoundError, MethodNotAllowedError } from '@cloudflare/kv-asset-handler'
import { response } from 'cfw-easy-utils'

addEventListener('fetch', event => {
    event.respondWith(handleEvent(event))
})
  
async function handleEvent(event) {
    const request = event.request

    if (request.method == 'GET') {
        try {
            return await getAssetFromKV(event, { ASSET_NAMESPACE: kv })
        } catch (e) {
            if (e instanceof NotFoundError) {
                // this is what should be happening
                var respOut = response.json({"code": 404, "message": "Key does not exist."})
                respOut.code = 404
                return respOut
            } else if (e instanceof MethodNotAllowedError) {
                // should never happen
                return new Response("this wont ever happen because method was already checked", { status: 500})
            } else {
                // make sure this exists
                console.log(kv)

                // i want to know what the error is
                return new Response(e.stack, { status: 500})

                // if the worker actually worked we would return this instead, or just throw the error
                //return new Response('An unexpected error occurred', { status: 500 })
            }
        }
    } else {
        // in the complete Worker o would do other operations for different methods 
        var respOut = response.json({"code": 405, "message": "Method not allowed."})
        respOut.code = 405
        return respOut
    }
}
