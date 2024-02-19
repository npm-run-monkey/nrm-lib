// Default
import Entity from "Entity/Entity";

class Vehicle extends Entity
{
    private readonly model: string;
    private readonly plate: string;
    private readonly owner: number;

    constructor(veh: TVehicle)
    {
        super(veh.netId);

        this.model = veh.model;
        this.owner = veh.netId;
        this.plate = veh.plate;
    }
}

export default Vehicle;