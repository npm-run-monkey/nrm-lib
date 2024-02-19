// Helpers
import DBVehicle from "Entity/db/vehicle.db";
import Utils from "Utils/Utils";

class vService
{
    public static createVehicle = (model: string, x: number, y: number, z: number, h: number, pNetId: number, warp: boolean): Promise<TVehicle> =>
    {
        return new Promise(async (res, rej) =>
        {
            try
            {

                const vehicle: number = CreateVehicle(GetHashKey(model), x, y, z, h, true, true);

                let i = 0;
                while (!DoesEntityExist(vehicle))
                {
                    await Utils.Delay(100);
                    i++;
    
                    if (i > 50)
                    {
                        break;
                    }
                }
    
                if (warp)
                {
                    const ped = GetPlayerPed(pNetId.toString());
    
                    TaskWarpPedIntoVehicle(ped, vehicle, -1);
                }
    
                SetEntityRoutingBucket(vehicle, 1);

                const cid = await global.exports["nrm-lib"].getPlayerCid(pNetId);
                const dbVehicle = await DBVehicle.createVehicleDB(vehicle, cid, model);

                res(dbVehicle);
            }
            catch(e)
            {
                rej(`Couldn't spawn vehicle (${model}): ${e} ...`);
            }
        });
    }
}


export default vService;