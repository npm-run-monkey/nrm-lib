import Entity from "Entity/Entity";

class Ped extends Entity
{
    private readonly event: string;

    constructor(pNetId: number, event: string)
    {
        super(pNetId);

        this.event = event;
    }

    public getEvent = () => this.event;
}

export default Ped;