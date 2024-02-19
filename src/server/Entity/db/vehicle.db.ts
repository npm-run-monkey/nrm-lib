class DBVehicle
{

    public static createVehicleDB = async (vNetId: number, cid: string, model: string): Promise<TVehicle> =>
    {
        return new Promise(async (res, rej) =>
        {
            const exists = await DBVehicle.doesVehicleExists(vNetId);

            if (exists)
            {
                // Get the vehicle credentials from the database
                const resp: QueryRes<TVehicle> = await global.exports["nrm-db"].executeAsyncQuery(`SELECT * FROM vehicles WHERE model='${model}'`);

                if (resp.rowCount > 0)
                {
                    res(resp.rows[0]);
                }
            }

            const vehicle: TVehicle = 
            {
                netId: vNetId,
                owner: cid,
                model: model,
                plate: GetVehicleNumberPlateText(vNetId)
            }

            res(vehicle);
        });
    }

    private static doesVehicleExists = (vNetId: number): Promise<boolean> =>
    {
        return new Promise(async (res, rej) =>
        {
            res(false) // For now just return false
        })
    }

    private static loadVehicleData = (): Promise<TVehicle> => 
    {
        return new Promise(async (res, rej) => 
        {

        });
    }

}

export default DBVehicle;