// Helpers
import DBVehicle from "Entity/db/vehicle.db";
import Utils from "Utils/Utils";

class vService
{
    public static createVehicle = (model: string, x: number, y: number, z: number, h: number, pNetId: number, warp: boolean): Promise<Vehicle> =>
    {
        return new Promise(async (res, rej) =>
        {
            const vehicle: number = CreateVehicle(GetHashKey(model), x, y, z, h, true, true);

            let i = 0;
            while (!DoesEntityExist(vehicle))
            {
                await Utils.Delay(100);
                i++;

                if (i > 100)
                {
                    rej(`Couldn't spawn vehicle (${model}) ...`);
                }
            }

            if (warp)
            {
                const ped = GetPlayerPed(pNetId.toString());

                TaskWarpPedIntoVehicle(ped, vehicle, -1);
            }

            try
            {
                const cid = await global.exports["nrm-db"].getPlayerCid(pNetId);
                const dbVehicle = await DBVehicle.createVehicleDB(vehicle, cid, model);

                res(dbVehicle);
            }
            catch(e)
            {
                rej(e)
            }
        });
    }
}


export default vService;