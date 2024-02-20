import Core from "Core/Core";

RegisterCommand('sv', (source: number, args: any[], rawCommand: string) =>
{
    if (source == 0) return;
    if (args[0] == null) return;
    if (typeof args[0] != "string") return;

    const pNetId: number = source;
    const ped = GetPlayerPed(pNetId.toString());
    const coords = GetEntityCoords(ped);
    const heading = GetEntityHeading(ped);

    Core.constructVehicle(args[0], coords[0], coords[1], coords[2], heading, pNetId, true, [ { name: "openen/sluiten", event: "nrm-lib:server:client:lockVehicle" }, { name: "open deuren", event: "nrm-lib:server:client:opendoors" } ]);
}, false);

RegisterCommand('dv', (source: number, args: any[], rawCommand: string) =>
{
    const pNetId: number = source;
    const ped = GetPlayerPed(pNetId.toString());
    let vehicle: number = GetVehiclePedIsIn(ped, false);

    if (vehicle == 0)
    {
        vehicle = GetVehiclePedIsIn(ped, true);
    }

    if (vehicle == 0) return;

    Core.destructVehicle(vehicle);

}, false);