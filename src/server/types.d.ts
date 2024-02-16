interface QueryRes<T>
{
    rowCount: number;
    rows: T[];
}

interface User
{
    id: number;
    cid: number;
    name: string;
    license: string;
    steam: string;
    location: string;
}