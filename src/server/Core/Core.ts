// Default
import Entity from "Entity/Entity";
import Player from "Entity/classes/Player";

// Helpers
import SpawnManager from "default/SpawnManager";

class Core
{

    private entities: Entity[];

    constructor()
    {
        this.entities = new Array<Entity>();
    }

    public getEntities = () =>
    {
        return this.entities;
    }

    public constructPlayer = (pNetId: number): void =>
    {
        const player: Entity = new Player(pNetId);

        this.entities.push(player);
    }

    public destructPlayer = async (pNetId: number): Promise<void> =>
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
            rej(null);
        });
    }

}

export default new Core();