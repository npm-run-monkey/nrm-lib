class SpawnManager
{
    public spawnPlayer = async (pNetId: number): Promise<void> =>
    {
        try
        {
            const coords = await this.getPlayerSpawnLocation(pNetId);

            if (typeof coords != "string")
            {
                JSON.stringify(coords);
            }

            emitNet('nrm-lib:server:client:spawnPlayer', pNetId, coords);
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

                const resp: QueryRes<string> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT coordinates FROM user_locations WHERE cid='${cid}'`);

                if (resp.rowCount > 0)
                {
                    global.exports['nrm-db'].executeQuery(`UPDATE user_locations SET coordinates='${JSON.stringify(coords)}' WHERE cid='${cid}'`);
                    res(true)
                    return;
                }
    
                global.exports['nrm-db'].executeQuery(`INSERT INTO user_locations (cid, coordinates) VALUES ('${cid}', '${JSON.stringify(coords)}')`);
    
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
            const heading = GetEntityHeading(ped);

            res({
                x: Number(coords[0].toFixed(2)), 
                y: Number(coords[1].toFixed(2)), 
                z: Number(coords[2].toFixed(2)), 
                h: Number(heading.toFixed(2))
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
                const resp: QueryRes<SpawnCoordsResp> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT coordinates FROM user_locations WHERE cid='${cid}'`);

                if (resp.rowCount > 0)
                {
                    res(resp.rows[0].coordinates);
                }
                res({ x: 466.84, y: 197.72, z: 111.52, h: 291.71 });
            }
            catch(e)
            {
                rej(e);
            }
        })
    }
}

export default new SpawnManager();