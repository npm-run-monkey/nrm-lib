import Core from "Core/Core";
import Entity from "Entity/Entity";
import Vehicle from "Entity/classes/Vehicle";

onNet('nrm-lib:client:server:lockVehicle', async (entity: number) =>
{
    if (Number(global.source) == 0) return;
    if (entity == 0) return;

    const pNetId = global.source

    let vehicle: number = NetworkGetEntityFromNetworkId(entity)

    try
    {
        const vehicleObj: Entity = await Core.findEntity(vehicle);

        if (vehicleObj instanceof Vehicle)
        {
            if (vehicleObj.getOwner() == pNetId)
            {
                vehicleObj.setLockStatus();
                return;
            }
            console.log(vehicle, vehicleObj.getOwner(), pNetId)
            console.log(`Player isn't the owner`);
        }
    }
    catch(e)
    {
        console.log(`No entity!`)
    }
});