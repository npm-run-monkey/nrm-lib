class pService
{
    public static getPlayerName = (pNetId: number): string =>
    {
        return GetPlayerName(pNetId.toString());
    }

    public static getSteam = (pNetId: number): string =>
    {
        return pService.getIdentifier(pNetId, "steam:");
    }

    public static getLicense = (pNetId: number): string =>
    {
        return pService.getIdentifier(pNetId, "license2:");
    }

    private static getIdentifier = (pNetId: number, identifier: string): string =>
    {
        let retval: string;
        
        const identifiers = getPlayerIdentifiers(pNetId);
        
        identifiers.forEach(iden =>
        {
            if (iden.includes(identifier))
            {
                retval = iden.split(':')[1];
            }
        });

        return retval ?? "Unknown";
    }
}

export default pService;