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