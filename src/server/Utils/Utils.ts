class Utils
{
    public static Delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));  
}

export default Utils;