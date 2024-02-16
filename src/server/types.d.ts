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
