class Weather
{

    public setMorning = (): void =>
    {
        emitNet('nrm-lib:server:client:setWeather', -1, 8);
    }

    public setNoon = (): void =>
    {
        emitNet('nrm-lib:server:client:setWeather', -1, 12);
    }

    public setEvening = (): void =>
    {
        emitNet('nrm-lib:server:client:setWeather', -1, 18);
    }

    public setNight = (): void =>
    {
        emitNet('nrm-lib:server:client:setWeather', -1, 0);
    }

}

export default new Weather();