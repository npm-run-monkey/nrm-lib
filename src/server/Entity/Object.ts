class Object
{
    private readonly oNetId: number;

    constructor(oNetId: number)
    {
        this.oNetId = oNetId;
    }

    public getNetId = (): number =>
    {
        return this.oNetId;
    }
}

export default Object;