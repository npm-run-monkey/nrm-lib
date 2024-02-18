RegisterNetEvent('nrm-lib:server:client:restart')

AddEventHandler('nrm-lib:server:client:restart', function()
    TriggerServerEvent('nrm-lib:client:server:respRestart');
end)