import Utils from "Utils/Utils";

class PedService
{
    public static createPed = (model: string, x: number, y: number, z: number, h: number): Promise<number> =>
    {
        return new Promise(async (res, rej) =>
        {
            try
            {

                const ped: number = CreatePed(1, GetHashKey(model), x, y, z, h, true, true);

                let i = 0;
                while (!DoesEntityExist(ped))
                {
                    await Utils.Delay(100);
                    i++;
    
                    if (i > 50)
                    {
                        break;
                    }
                }
    
                SetEntityRoutingBucket(ped, 1);
                FreezeEntityPosition(ped, true);

                res(ped);
            }
            catch(e)
            {
                rej(`Couldn't spawn ped (${model}): ${e} ...`);
            }
        });
    }
}

export default PedService;