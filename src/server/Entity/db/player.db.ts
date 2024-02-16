// Service
import pService from "Entity/service/Player.service";

// Helpers
import { v4 as uuidv4 } from 'uuid';

class DBPlayer
{
    public static createDBPlayer = (pNetId: number): Promise<User> =>
    {
        const license = pService.getLicense(pNetId);

        return new Promise(async (res, _) =>
        {
            const exists = await DBPlayer.doesPlayerExists(license);

            if (exists)
            {
                const user: User = await DBPlayer.loadPlayerData(license);
                res(user);
            }

            const user: User = 
            {
                cid: uuidv4(),
                name: pService.getPlayerName(pNetId),
                license: license,
                steam: pService.getSteam(pNetId)
            }

            global.exports['nrm-db'].executeQuery(`INSERT INTO users (cid, name, license, steam) VALUES ('${user.cid}', '${user.name}', '${user.license}', '${user.steam}')`);

            res(user);
        });
    }

    private static loadPlayerData = (license: string): Promise<User> =>
    {
        return new Promise(async (res, _) =>
        {   
            const user: QueryRes<User> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT * FROM users WHERE license='${license}'`);
            res(user.rows[0]);
        });
    }

    private static doesPlayerExists = (license: string): Promise<boolean> =>
    {
        return new Promise(async (res, _) =>
        {
            const result: QueryRes<string> = await global.exports['nrm-db'].executeAsyncQuery(`SELECT cid FROM users WHERE license='${license}'`);

            if (result.rowCount > 0)
            {
                res(true);
            }
            res(false);
        });
    }
}

export default DBPlayer;