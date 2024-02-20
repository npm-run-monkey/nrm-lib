import Entity from "Entity/Entity";

class Ped extends Entity
{
    private readonly entries: Entry[];

    constructor(pNetId: number, entries?: Entry[])
    {
        super(pNetId);

        this.entries = entries ?? [];
    }

    public getEntries = () => this.entries;
}

export default Ped;