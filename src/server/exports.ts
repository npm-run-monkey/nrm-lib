import Core from "Core/Core";
import Ped from "Entity/classes/Ped";

global.exports('getPlayerCid', (pNetId: number): Promise<string> =>
{
    return new Promise(async (res, rej) =>
    {
        try
        {
            const cid = (await Core.findPlayer(pNetId)).getCid();

            if (cid)
            {
                res(cid);
            }
        }
        catch(e)
        {
            rej(e);
        }
    });
});

global.exports('constructPed', (model: string, x: number, y: number, z: number, h: number, event: string): void =>
{
    Core.constructPed(model, x, y, z, h, event);
});

global.exports('findPed', (pNetId: number): Promise<Ped> =>
{
    return new Promise(async (res, rej) =>
        {
            try
            {
                res(await Core.findPed(pNetId));
            }
            catch(e)
            {
                rej(e);
            }
        });
});