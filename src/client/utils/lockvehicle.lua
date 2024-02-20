RegisterNetEvent('nrm-lib:server:client:lockVehicle')

AddEventHandler('nrm-lib:server:client:lockVehicle', function(entity)
    print(entity)
	TriggerServerEvent('nrm-lib:client:server:lockVehicle', NetworkGetNetworkIdFromEntity(entity));
end)

RegisterNetEvent('nrm-lib:server:client:opendoors')

AddEventHandler('nrm-lib:server:client:opendoors', function(entity)
    for i = 0, 5 do
        if (IsVehicleDoorFullyOpen(entity, i)) then
            setvehicledoorshut(entity, i, false);
        end

        if (not IsVehicleDoorFullyOpen(entity, i)) then
            SetVehicleDoorOpen(entity, i, false, false)
            Citizen.Wait(500)
        end 
      end
end)

local playVehicleLockAnimation = function()
	local dict = "anim@mp_player_intmenu@key_fob@"

	RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Citizen.Wait(100)
    end

	TaskPlayAnim(GetPlayerPed(-1), dict, "fob_click_fp", 8.0, 8.0, -1, 48, 1, false, false, false)
end

RegisterNetEvent('nrm-lib:server:client:playLockAnimation')

AddEventHandler('nrm-lib:server:client:playLockAnimation', function()
	playVehicleLockAnimation();
end)