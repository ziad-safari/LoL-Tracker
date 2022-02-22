let summoners

export default class summonersDAO {
    static async injectDB(conn) {
        if (summoners) {
            return
        }
        try { 
            summoners = await conn.db(process.env.TRACKER_NS).collection("summoners")
        } catch (e) {
            console.error(
                'Unable to establish a collection handle in summonersDAO: ' +e,
            )
        }
    }

    // getting a summoner? 

    static async getSummoner({
        filters = null
    } = {}) {
        let query 
        query = { "id" : { $eq: filters["id"] } }
        
        let cursor
        try { 
            cursor = await summoners
            .find(query)
        } catch (e) {
            console.error('Unable to issue find command' +e)
        }
    }
}
