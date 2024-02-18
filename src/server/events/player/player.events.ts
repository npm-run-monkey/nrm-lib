import Core from "Core/Core";

onNet('nrm-lib:server:server:playerObjCreated', (cid: string) =>
{
    console.log(`Player Object created with Cid: ${cid}`);
});

onNet('nrm-lib:client:server:respRestart', () =>
{
    Core.constructPlayer(global.source);
})

on('playerJoining', () =>
{
    SetRoutingBucketEntityLockdownMode(1, "strict")
    SetPlayerRoutingBucket(global.source.toString(), 1)
    SetRoutingBucketPopulationEnabled(1, false)
});