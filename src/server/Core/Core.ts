// Default
import Entity from "Entity/Entity";
import Player from "Entity/classes/Player";

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

    public constructPlayer = (pNetId: number) =>
    {
        const player: Entity = new Player(pNetId);

        this.entities.push(player);
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