class SpawnManager
{
    public spawnPlayer = async (pNetId: number): Promise<void> =>
    {
        const start_time = GetGameTimer();
        try
        {
            const { x, y, z } = await this.getPlayerSpawnLocation(pNetId);

            emitNet('nrm-lib:server:client:spawnPlayer', pNetId, x, y, z);
            const end_time = GetGameTimer() - start_time;

            console.log(end_time);
        }   
        catch(e)
        {
            console.log(`Error occurred while trying to get player spawn location: ${e}`);
        }
    }

    public SavePlayerLocation = (pNetId: number): Promise<boolean> =>
    {
        return new Promise( async (res, rej) =>
        {
            try
            {
                const coords = await this.getPlayerLocation(pNetId);
                const cid = await global.exports['nrm-lib'].getPlayerCid(pNetId);

                const resp: QueryRes<string> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT x FROM user_locations WHERE cid='${cid}'`);

                if (resp.rowCount > 0)
                {
                    global.exports['nrm-db'].executeQuery(`UPDATE user_locations SET x=${coords.x}, y=${coords.y}, z=${coords.z} WHERE cid='${cid}'`);
                    res(true)
                    return;
                }
    
                global.exports['nrm-db'].executeQuery(`INSERT INTO user_locations (cid, x, y, z) VALUES ('${cid}', ${coords.x}, ${coords.y}, ${coords.z})`);
    
                res(true);
            }
            catch(e)
            {
                rej(e);
            }
        });
    }

    private getPlayerLocation = (pNetId: number): Promise<SpawnCoords> =>
    {
        return new Promise((res, rej) =>
        {
            const ped = GetPlayerPed(pNetId.toString());
            const coords = GetEntityCoords(ped);

            res({
                x: Number(coords[0].toFixed(2)), 
                y: Number(coords[1].toFixed(2)), 
                z: Number(coords[2].toFixed(2))
            })
        });
    }

    private getPlayerSpawnLocation = (pNetId: number): Promise<SpawnCoords> =>
    {
        return new Promise(async (res, rej) =>
        {
            try
            {
                const cid = await global.exports['nrm-lib'].getPlayerCid(pNetId);
                const resp: QueryRes<SpawnCoordsResp> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT x, y, z FROM user_locations WHERE cid='${cid}'`);

                if (resp.rowCount > 0)
                {
                    res( { x: resp.rows[0].x, y: resp.rows[0].y, z: resp.rows[0].z } );
                }
                res( { x: 466.84, y: 197.72, z: 111.52 } );
            }
            catch(e)
            {
                rej(e);
            }
        })
    }
}

export default new SpawnManager();