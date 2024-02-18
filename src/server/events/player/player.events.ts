// Default
import Core from "Core/Core";

// Helpers
import SpawnManager from "default/SpawnManager";

onNet('nrm-lib:server:server:playerObjCreated', (cid: string) =>
{
    console.log(`Player Object created with Cid: ${cid}`);
});

onNet('nrm-lib:client:server:respRestart', () =>
{
    Core.constructPlayer(global.source);
})

onNet('nrm-lib:client:server:NetworkActive', () =>
{
    const pNetId = global.source;

    SpawnManager.spawnPlayer(pNetId);
});

on('playerJoining', () =>
{
    SetRoutingBucketEntityLockdownMode(1, "strict")
    SetPlayerRoutingBucket(global.source.toString(), 1)
    SetRoutingBucketPopulationEnabled(1, false)
});

on('playerDropped', async () =>
{
    const pNetId = global.source;

    try
    {
        const saved = await SpawnManager.SavePlayerLocation(pNetId);

        if (saved)
        {
            Core.destructPlayer(pNetId);
        }
    }
    catch(e)
    {
        console.log(`Error occured: ${e}`)
    }
});