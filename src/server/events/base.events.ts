// Default
import Core from "Core/Core";

// Helpers
import Utils from "Utils/Utils";

on('playerJoining', () =>
{
    Core.constructPlayer(global.source);
});

on('onServerResourceStart', async (resource: string) =>
{
    if (resource === GetCurrentResourceName())
    {
        await Utils.Delay(500);
        emitNet('nrm-lib:server:client:restart', -1);
    }
})