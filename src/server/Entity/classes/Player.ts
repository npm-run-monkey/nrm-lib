// Default
import Entity from "Entity/Entity";

// Helpers
import pService from "Entity/service/Player.service";

class Player extends Entity
{
    private readonly license: string;
    private readonly steam: string;
    private readonly name: string;

    constructor(pNetId: number)
    {
        super(pNetId);

        this.license  =  pService.getLicense(this.getNetId());
        this.steam    =  pService.getSteam(this.getNetId());
        this.name     =  pService.getPlayerName(this.getNetId());
    }

    public getLicense = (): string =>
    {
        return this.license;
    }

    public getSteam = (): string =>
    {
        return this.steam;
    }

    public getName = (): string =>
    {
        return this.name;
    }
}

export default Player;