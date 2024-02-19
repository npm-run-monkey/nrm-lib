interface QueryRes<T>
{
    rowCount: number;
    rows: T[];
}

interface User
{
    cid: string,
    name: string;
    license: string;
    steam: string;
}

interface Vehicle
{
    netId: number;
    owner: string;
    model: string;
    plate: string;
}

interface SpawnCoords
{
    x: number;
    y: number;
    z: number;
    h: number;
}

interface SpawnCoordsResp
{
    coordinates: SpawnCoords;
}