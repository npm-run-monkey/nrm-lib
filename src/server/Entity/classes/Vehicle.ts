// Default
import Entity from "Entity/Entity";

class Vehicle extends Entity
{
    private readonly model: string;
    private readonly plate: string;
    private readonly owner: number;

    private entries: Entry[];

    private locked: boolean = false;

    constructor(veh: TVehicle, owner: number, entries?: Entry[])
    {
        super(veh.netId);

        this.model = veh.model;
        this.owner = owner;
        this.plate = veh.plate;

        this.entries = entries ?? [];
    }

    public getEntries = () => this.entries;

    public getOwner = (): number =>
    {
        return this.owner;
    }

    public setLockStatus = () =>
    {
        emitNet('nrm-lib:server:client:playLockAnimation', this.owner);

        if (this.locked)
        {
            SetVehicleDoorsLocked(this.getNetId(), 1);
            this.locked = false
            return;
        }   
        SetVehicleDoorsLocked(this.getNetId(), 2);
        this.locked = true
    }
}

export default Vehicle;