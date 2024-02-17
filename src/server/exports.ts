import Core from "Core/Core";

global.exports('getPlayerCid', (pNetId: number): Promise<string> =>
{
    return new Promise(async (res, rej) =>
    {
        const cid = (await Core.findPlayer(pNetId)).getCid();

        if (cid)
        {
            res(cid);
        }

        if (cid == null)
        {
            rej("Coudn't find player's Cid ...");
        }
    });
});