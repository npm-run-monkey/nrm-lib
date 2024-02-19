// Default
import Entity from "Entity/Entity";

// Database
import DBPlayer from "Entity/db/player.db";

class Player extends Entity
{
    private cid: string;
    private name: string;
    private license: string;
    private steam: string;

    constructor(pNetId: number)
    {
        super(pNetId);

        this.fetchPlayerData();
    }

    public getCid = (): string =>
    {
        return this.cid;
    }

    public getName = (): string =>
    {
        return this.name;
    }

    public getLicense = (): string =>
    {
        return this.license;
    }

    public getSteam = (): string =>
    {
        return this.steam;
    }

    private fetchPlayerData = async (): Promise<void> =>
    {
        try
        {
            const user = await DBPlayer.createDBPlayer(this.getNetId());

            this.cid = user.cid;
            this.name = user.name; 
            this.license = user.license;
            this.steam = user.steam;
    
            emit('nrm-lib:server:server:playerObjCreated', this.cid);
        }
        catch(e)
        {
            console.log(`Error occurred: ${e}`);
        }
    }
}

export default Player;