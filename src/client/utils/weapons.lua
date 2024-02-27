RegisterKeyMapping('inv_slot1', 'slot 1', 'keyboard', '1')
RegisterKeyMapping('inv_slot2', 'slot 2', 'keyboard', '2')
RegisterKeyMapping('inv_slot3', 'slot 3', 'keyboard', '3')
RegisterKeyMapping('inv_slot4', 'slot 4', 'keyboard', '4')
RegisterKeyMapping('inv_slot5', 'slot 5', 'keyboard', '5')
RegisterKeyMapping('inv', 'open inv', 'keyboard', '²')

local has_weapon = "none";
local holstering = false

function loadAnimDict(dict)
	while ( not HasAnimDictLoaded(dict)) do
		RequestAnimDict(dict)
		Citizen.Wait(0)
	end
end

AddEventHandler('entityDamaged', function(victim, culprit, weapon, damage)
    local ped = GetPlayerPed(-1)

    if (IsPlayerDead(ped)) then 
        giveWeaponToPed("none");
    end
end)

giveWeaponToPed = function(weapon)
    local ped = GetPlayerPed(-1)

    if (IsPedInAnyVehicle(ped, true)) then return end

    if (exports['nrm-lib'].isSurrendering()) then
        RemoveAllPedWeapons(ped, true)
        has_weapon = "none"
        return
    end

    if (has_weapon == weapon) then
        if (weapon == 'combatpistol' or weapon == 'stungun') then
            loadAnimDict("rcmjosh4")
            loadAnimDict("reaction@intimidation@cop@unarmed")

            holstering = true

            Citizen.CreateThread(function()
                while (holstering) do
                    Citizen.Wait(10)
                    DisableControlAction(0, 25, true)
                    DisableControlAction(0, 24, true)
                end
            end)

            TaskPlayAnim(ped, "rcmjosh4", "josh_leadout_cop2", 8.0, 2.0, -1, 48, 10, 0, 0, 0 )
            Citizen.Wait(500)
            TaskPlayAnim(ped, "reaction@intimidation@cop@unarmed", "outro", 8.0, 2.0, -1, 50, 2.0, 0, 0, 0 )
            Citizen.Wait(250)
            ClearPedTasks(ped)

            holstering = false
        end

        if (weapon == 'combatpistol') then
            local drawable = GetPedDrawableVariation(PlayerPedId(), 7)

            if (drawable == 2) then
                SetPedComponentVariation(PlayerPedId(), 7, 8, 0, 0)
            end

            if (drawable == 5) then
                SetPedComponentVariation(PlayerPedId(), 7, 6, 0, 0)
            end
        end

        RemoveAllPedWeapons(ped, true)
        has_weapon = "none"
        holstering = false
        return
    end

    has_weapon = weapon

    if (has_weapon == 'combatpistol' or has_weapon == 'stungun') then
        loadAnimDict("rcmjosh4")
		loadAnimDict("reaction@intimidation@cop@unarmed")

        holstering = true

        Citizen.CreateThread(function()
            while (holstering) do
                Citizen.Wait(10)
                DisableControlAction(0, 25, true)
                DisableControlAction(0, 24, true)
            end
        end)

        GiveWeaponToPed(ped, GetHashKey('WEAPON_COMBATPISTOL'), 100, false, true);

        TaskPlayAnim(ped, "reaction@intimidation@cop@unarmed", "intro", 8.0, 2.0, -1, 50, 2.0, 0, 0, 0 )
        Citizen.Wait(450)
        TaskPlayAnim(ped, "rcmjosh4", "josh_leadout_cop2", 8.0, 2.0, -1, 48, 10, 0, 0, 0 )
        Citizen.Wait(400)
        ClearPedTasks(ped)

        if (weapon == 'combatpistol') then
            local drawable = GetPedDrawableVariation(PlayerPedId(), 7)

            if (drawable == 8) then
                SetPedComponentVariation(PlayerPedId(), 7, 2, 0, 0)
            end

            if (drawable == 6) then
                SetPedComponentVariation(PlayerPedId(), 7, 5, 0, 0)
            end
        end

        Citizen.Wait(200)

        holstering = false
    end

    if (has_weapon == 'stungun') then
        GiveWeaponToPed(ped, GetHashKey('WEAPON_STUNGUN'), 100, false, true);
    end

    if (has_weapon == 'nightstick') then
        GiveWeaponToPed(ped, GetHashKey('WEAPON_NIGHTSTICK'), 100, false, true);
    end

    if (has_weapon == 'flashlight') then
        GiveWeaponToPed(ped, GetHashKey('WEAPON_FLASHLIGHT'), 100, false, true);
    end

    if (has_weapon == 'knife') then
        GiveWeaponToPed(ped, GetHashKey('WEAPON_SWITCHBLADE'), 100, false, true);
    end

    Citizen.CreateThread(function()
        while (has_weapon == weapon) do
            Citizen.Wait(10)
            DisableControlAction(0, 37, true)
            if (IsPedInAnyVehicle(ped, true)) then
                has_weapon = "none";
                RemoveAllPedWeapons(ped, true)
            end
        end
    end)
end

RegisterCommand('cl', function()
    RemoveAllPedWeapons(GetPlayerPed(-1), true)
end)

RegisterCommand('inv', function()
    print('Open inv')
    Citizen.Wait(5000)
    print('Hide inv')
end)

RegisterCommand('inv_slot1', function() 
    giveWeaponToPed('combatpistol')
end)

RegisterCommand('inv_slot2', function()
    giveWeaponToPed('stungun')
end)

RegisterCommand('inv_slot3', function()
    giveWeaponToPed('nightstick')
end)

RegisterCommand('inv_slot4', function()
    giveWeaponToPed('flashlight')
end)

RegisterCommand('inv_slot5', function()
    giveWeaponToPed('knife')
end)

exports('giveWeaponToPed', giveWeaponToPed);