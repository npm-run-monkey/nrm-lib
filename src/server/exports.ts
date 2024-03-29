import Entity from "Entity/Entity";
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

global.exports('constructPed', (model: string, x: number, y: number, z: number, h: number, entries: Entry[]): void =>
{
    Core.constructPed(model, x, y, z, h, entries);
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

global.exports('findEntity', (netId: number): Promise<Entity> =>
{
    return new Promise(async (res, rej) =>
    {
        try
        {
            res(await Core.findEntity(netId));
        }
        catch(e)
        {
            rej(e)
        }
    })
})