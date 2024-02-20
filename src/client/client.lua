RegisterNetEvent('nrm-lib:server:client:restart')

AddEventHandler('nrm-lib:server:client:restart', function()
    TriggerServerEvent('nrm-lib:client:server:respRestart');
end)

RegisterNetEvent('nrm-lib:server:client:closeDoor')

AddEventHandler('nrm-lib:server:client:closeDoor', function(entity)
    local coords = GetEntityCoords(NetworkGetEntityFromNetworkId(entity))
    print(coords, entity, NetworkGetEntityFromNetworkId(entity))
    for i = 0, 5 do
        SetVehicleDoorOpen(NetworkGetEntityFromNetworkId(entity), i, false, false) -- will open every door from 0-5
        Citizen.Wait(500)
      end
end)