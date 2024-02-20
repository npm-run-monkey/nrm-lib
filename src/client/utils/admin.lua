function respawnPed(ped,coords, h)
	SetEntityCoordsNoOffset(ped, coords.x, coords.y, coords.z, false, false, false, true)
	NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, h, true, false) 

	SetPlayerInvincible(ped, false) 
	ClearPedBloodDamage(ped)
end

RegisterCommand('tp', function(source, args, rawCommand)
    if tonumber(args[1]) == nil and tonumber(args[2]) == nil and tonumber(args[3]) == nil then return end
	local pos = vector3( tonumber(args[1]), tonumber(args[2]), tonumber(args[3]) )
	local ped = PlayerPedId()
	local ply = PlayerId()
	Citizen.CreateThread(function ()
		RequestCollisionAtCoord(pos)
		SetPedCoordsKeepVehicle(ped, pos)
		FreezeEntityPosition(ped, true)
		SetPlayerInvincible(ply, true)

		local timeout = GetGameTimer()
		while not HasCollisionLoadedAroundEntity(ped) and timeout - GetGameTimer() < 5000 do
			Wait(0)
		end

		FreezeEntityPosition(ped, false)
		SetPlayerInvincible(ply, false)
	end)
end)

RegisterCommand('tpm', function(source, args, rawCommand)
    Citizen.CreateThread(function()
		local entity = PlayerPedId()
		local ped = PlayerPedId()
		if IsPedInAnyVehicle(entity, false) then
			entity = GetVehiclePedIsUsing(entity)
		end
		local success = false
		local blipFound = false
		local blipIterator = GetWaypointBlipEnumId()
		local blip = GetFirstBlipInfoId(8)

		while DoesBlipExist(blip) do
			if GetBlipInfoIdType(blip) == 4 then
				cx, cy, cz = table.unpack(GetBlipInfoIdCoord(blip))
				blipFound = true
				break
			end
			blip = GetNextBlipInfoId(blipIterator)
		end

		if blipFound then
			DoScreenFadeOut(250)
			while IsScreenFadedOut() do
				Citizen.Wait(250)
			end
			local groundFound = false
			local yaw = GetEntityHeading(entity)
			
			for i = 0, 1000, 1 do
				SetEntityCoordsNoOffset(entity, cx, cy, ToFloat(i), false, false, false)
				SetEntityRotation(entity, 0, 0, 0, 0 ,0)
				SetEntityHeading(entity, yaw)
				SetGameplayCamRelativeHeading(0)
				Citizen.Wait(0)
				--groundFound = true
				if GetGroundZFor_3dCoord(cx, cy, ToFloat(i), cz, false) then --GetGroundZFor3dCoord(cx, cy, i, 0, 0) GetGroundZFor_3dCoord(cx, cy, i)
					cz = ToFloat(i)
					groundFound = true
					break
				end
			end
			if not groundFound then
				cz = -300.0
			end
			success = true
		end

		if success then
			SetEntityCoordsNoOffset(entity, cx, cy, cz, false, false, true)
			SetGameplayCamRelativeHeading(0)
			if (GetEntityType(entity) == 2) then
				if (GetPedInVehicleSeat(entity, -1) == ped) then
					SetVehicleOnGroundProperly(entity)
				end
			end
			DoScreenFadeIn(250)
		end
	end)
end)

RegisterCommand('revive', function()
	local ped = GetPlayerPed(-1)
	local coords = GetEntityCoords(ped);
	local heading = GetEntityHeading(ped);

	respawnPed(ped, coords, heading)
end)

RegisterCommand('fix', function()
	local playerPed = GetPlayerPed(-1)
	if IsPedInAnyVehicle(playerPed, false) then
		local vehicle = GetVehiclePedIsIn(playerPed, false)
		SetVehicleEngineHealth(vehicle, 1000)
		SetVehiclePetrolTankHealth(vehicle, 1000)
		SetVehicleFixed(vehicle)
	end
end)