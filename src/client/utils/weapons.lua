RegisterKeyMapping('inv_slot1', 'slot 1', 'keyboard', '1')
RegisterKeyMapping('inv_slot2', 'slot 2', 'keyboard', '2')
RegisterKeyMapping('inv_slot3', 'slot 3', 'keyboard', '3')
RegisterKeyMapping('inv_slot4', 'slot 4', 'keyboard', '4')
RegisterKeyMapping('inv_slot5', 'slot 5', 'keyboard', '5')
RegisterKeyMapping('inv', 'open inv', 'keyboard', '²')

local has_weapon = "none";
local holstering = false

local policeHolstersV2 = { 
    [1] = nil,
    [2] = 8,
    [3] = nil,
    [4] = nil,
    [5] = 6,
    [6] = 7,
    [7] = 6,
    [8] = nil
}

local doesPlayerHasPoliceHolster = function()
    local drawable = GetPedDrawableVariation(PlayerPedId(), 7)

    for k, v in pairs(policeHolstersV2) do
        if (v == drawable or k == drawable) then 
            return true 
        end
    end
    return false
end

local flipHolster = function()
    local drawable = GetPedDrawableVariation(PlayerPedId(), 7)

    for k, v in pairs(policeHolstersV2) do
        if (v == drawable) then
            SetPedComponentVariation(PlayerPedId(), 7, k, 0, 0)
            return;
        end
        if (k == drawable) then
            SetPedComponentVariation(PlayerPedId(), 7, v, 0, 0)
            return;
        end
    end
end

local restoreHolster = function()
    local drawable = GetPedDrawableVariation(PlayerPedId(), 7)

    for k, v in pairs(policeHolstersV2) do
        if (k == drawable) then
            SetPedComponentVariation(PlayerPedId(), 7, v, 0, 0)
            return;
        end
    end
end

function loadAnimDict(dict)
	while ( not HasAnimDictLoaded(dict)) do
		RequestAnimDict(dict)
		Citizen.Wait(0)
	end
end

AddEventHandler('entityDamaged', function(victim, culprit, weapon, damage)
    local ped = GetPlayerPed(-1)

    if (IsPedFatallyInjured(ped)) then 
        giveWeaponToPed("none");
        restoreHolster()
    end
end)

AddEventHandler('onClientResourceStart', function(resource)
    if (resource == GetCurrentResourceName()) then
        local has_weapon = "none";
        local holstering = false
        RemoveAllPedWeapons(GetPlayerPed(-1), true)
        restoreHolster()
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

            holstering = true

            if (doesPlayerHasPoliceHolster()) then
                loadAnimDict("rcmjosh4")
                loadAnimDict("reaction@intimidation@cop@unarmed")
    
                TaskPlayAnim(ped, "rcmjosh4", "josh_leadout_cop2", 8.0, 2.0, -1, 48, 10, 0, 0, 0 )
                Citizen.Wait(500)
                TaskPlayAnim(ped, "reaction@intimidation@cop@unarmed", "outro", 8.0, 2.0, -1, 30, 2.0, 0, 0, 0 )
                Citizen.Wait(250)
            else
                loadAnimDict( "reaction@intimidation@1h" )

                TaskPlayAnim(ped, "reaction@intimidation@1h", "outro", 8.0, 2.0, -1, 30, 10, 0, 0, 0 )
                Citizen.Wait(2000)
            end

            holstering = false
        end

        flipHolster()

        RemoveAllPedWeapons(ped, true)
        has_weapon = "none"
        holstering = false

        ClearPedTasks(ped)

        return
    end

    has_weapon = weapon

    if (has_weapon == 'combatpistol' or has_weapon == 'stungun') then
        holstering = true

        if (weapon == 'combatpistol') then
            GiveWeaponToPed(ped, GetHashKey('WEAPON_COMBATPISTOL'), 100, false, true);
        elseif (weapon == 'stungun') then
            GiveWeaponToPed(ped, GetHashKey('WEAPON_STUNGUN'), 100, false, true);
        else
            print('lol')
        end

        Citizen.Wait(200)

        if (doesPlayerHasPoliceHolster()) then
            loadAnimDict("rcmjosh4")
            loadAnimDict("reaction@intimidation@cop@unarmed")

            TaskPlayAnim(ped, "reaction@intimidation@cop@unarmed", "intro", 8.0, 2.0, -1, 30, 2.0, 0, 0, 0 )
            Citizen.Wait(450)
            TaskPlayAnim(ped, "rcmjosh4", "josh_leadout_cop2", 8.0, 2.0, -1, 48, 10, 0, 0, 0 )
            Citizen.Wait(400)
        else
            loadAnimDict( "reaction@intimidation@1h" )

            TaskPlayAnim(ped, "reaction@intimidation@1h", "intro", 8.0, 2.0, -1, 30, 10, 0, 0, 0 )
            Citizen.Wait(2000)
        end

        flipHolster()

        Citizen.Wait(200)

        holstering = false

        ClearPedTasks(ped)
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
                restoreHolster()
            end
        end
    end)
end

RegisterCommand('inv', function()
    print('Open inv')
    Citizen.Wait(5000)
    print('Hide inv')
end)

RegisterCommand('inv_slot1', function() 
    if (has_weapon == 'combatpistol' or has_weapon == "none") then
        giveWeaponToPed('combatpistol')
    end
end)

RegisterCommand('inv_slot2', function()
    if (has_weapon == 'stungun' or has_weapon == "none") then
        giveWeaponToPed('stungun')
    end
end)

RegisterCommand('inv_slot3', function()
    if (has_weapon == 'nightstick' or has_weapon == "none") then
        giveWeaponToPed('nightstick')
    end
end)

RegisterCommand('inv_slot4', function()
    if (has_weapon == 'flashlight' or has_weapon == "none") then
        giveWeaponToPed('flashlight')
    end
end)

RegisterCommand('inv_slot5', function()
    if (has_weapon == 'knife' or has_weapon == "none") then
        giveWeaponToPed('knife')
    end
end)

exports('giveWeaponToPed', giveWeaponToPed);
exports('restoreHolster', restoreHolster)