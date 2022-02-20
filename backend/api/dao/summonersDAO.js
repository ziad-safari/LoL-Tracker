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
                'Unable to establish a collection handle in restaurantsDAO: ' +e,
            )
        }
    }
}

