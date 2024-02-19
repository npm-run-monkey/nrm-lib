abstract class Entity
{
    private readonly netId: number;

    constructor(netId: number)
    {
        this.netId = netId;
    }

    public getNetId = (): number =>
    {
        return this.netId;
    }

    public destructEntity = () =>
    {
        DeleteEntity(this.netId);
    }
}

export default Entity;