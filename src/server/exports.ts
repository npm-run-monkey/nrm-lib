import Core from "Core/Core";

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