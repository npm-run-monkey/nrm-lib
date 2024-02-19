// Default
import Entity from "Entity/Entity";

// Helpers
import Player from "Entity/classes/Player";
import Vehicle from "Entity/classes/Vehicle";
import Ped from "../Entity/classes/Ped";

// Service
import vService from "Entity/service/Vehicle.service";
import PedService from "Entity/service/Ped.service";

class Core
{

    private entities: Entity[];

    constructor()
    {
        this.entities = new Array<Entity>();
    }

    // Getter

    public getEntities = () =>
    {
        return this.entities;
    }

    // Player

    public constructPlayer = (pNetId: number): void =>
    {
        const player: Entity = new Player(pNetId);

        this.entities.push(player);
    }

    public destructPlayer = async (pNetId: number): Promise<void> =>
    {
        try
        {
            const player: Entity = await this.findPlayer(pNetId);

            if (player instanceof Player)
            {
                const index = this.entities.indexOf(player);
    
                if (index > -1)
                {
                    this.entities.splice(index, 1);
                }
            }
        }
        catch(e)
        {
            console.log(`Error occurred: ${e}`);
        }
    }

    public findPlayer = (pNetId: number): Promise<Player> =>
    {
        return new Promise(async (res, rej) =>
        {
            this.entities.forEach((entity: Entity) =>
            {
                if (entity.getNetId() == pNetId)
                {
                    if (entity instanceof Player)
                    {
                        res(entity);
                    }
                }
            });
            rej(`Couldn't find player ...`);
        });
    }

    // Vehicle

    public constructVehicle = async (model: string, x:number, y: number, z: number, h: number, pNetId: number, warp: boolean): Promise<void> =>
    {
        try
        {
            const vehicle: TVehicle = await vService.createVehicle(model, x, y, z, h, pNetId, warp); 

            this.entities.push(new Vehicle(vehicle));
        }
        catch(e)
        {   
            console.log(`Error occurred: ${e}`);
        }
    }

    public destructVehicle = async (vNetId: number): Promise<void> =>
    {
        try
        {
            const vehicle: Vehicle = await this.findVehicle(vNetId);

            const index = this.entities.indexOf(vehicle);
            vehicle.destructEntity();

            if (index > -1)
            {
                this.entities.splice(index, 1);
            }
        }
        catch(e)
        {
            console.log(`Error occurred: ${e}`);
        }
    }

    private findVehicle = (vNetId: number): Promise<Vehicle> =>
    {
        return new Promise((res, rej) =>
        {
            this.entities.forEach((entity: Entity) =>
            {
                if (entity.getNetId() == vNetId)
                {
                    if (entity instanceof Vehicle)
                    {
                        res(entity)
                    }
                }
            });
            rej(`Couldn't find vehicle ...`);
        });
    }

    // Peds

    public constructPed = async (model: string, x:number, y: number, z: number, h: number, event: string): Promise<void> =>
    {
        try
        {
            const ped = await PedService.createPed(model, x, y, z, h);

            this.entities.push(new Ped(ped, event));

            console.log(this.entities);
        }
        catch(e)
        {
            console.log(`Error occurred: ${e}`);
        }
    }

    public findPed = async (pNetId: number): Promise<Ped> =>
    {
        return new Promise((res, rej) =>
        {
            this.entities.forEach((entity: Entity) =>
            {
                if (entity.getNetId() == pNetId)
                {
                    if (entity instanceof Ped)
                    {
                        res(entity)
                    }
                }
            });
            rej(`Couldn't find ped ...`);
        });
    }

}

export default new Core();