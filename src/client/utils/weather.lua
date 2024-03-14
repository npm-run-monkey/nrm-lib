RegisterNetEvent('nrm-lib:server:client:setWeather')

AddEventHandler('nrm-lib:server:client:setWeather', function(hours)
    NetworkOverrideClockTime(hours, 00, 00);
end)