RegisterKeyMapping('handsup', 'Hands Up', 'keyboard', 'x');

local handsup = false;
local surrender = false;
local busy = false;

local loadDict = function(dict)
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		Citizen.Wait(100)
	end
end

AddEventHandler('entityDamaged', function(victim, culprit, weapon, damage)
    local ped = GetPlayerPed(-1)

    if (IsPedFatallyInjured(ped)) then 
        --[[ Reset params if he is dead ]]--
        
        handsup = false;
        surrender = false;
        busy = false;
        ClearPedTasks(ped)
    end
end)

local puttinghandsup = false

RegisterCommand('handsup', function()
    if (busy or IsPedInAnyVehicle(GetPlayerPed(-1))) then return end
    busy = true

    local ped = GetPlayerPed(-1)

    giveWeaponToPed("none")

    if (puttinghandsup) then
        --[[ Assuming double click X ]]--

        ClearPedTasks(ped)

        loadDict( "random@arrests" )
        loadDict("random@arrests@busted")

        TaskPlayAnim( ped, "random@arrests", "idle_2_hands_up", 8.0, 1.0, -1, 2, 0, 0, 0, 0 )
        Wait (4000)
        TaskPlayAnim( ped, "random@arrests", "kneeling_arrest_idle", 8.0, 1.0, -1, 2, 0, 0, 0, 0 )
        Wait (500)
        TaskPlayAnim( ped, "random@arrests@busted", "enter", 8.0, 1.0, -1, 2, 0, 0, 0, 0 )
        Wait (1000)
        TaskPlayAnim( ped, "random@arrests@busted", "idle_a", 8.0, 1.0, -1, 9, 0, 0, 0, 0 )
        busy = false
        handsup = true
        surrender = true
        return;
    end

    if (not handsup) then
        puttinghandsup = true
        loadDict("missminuteman_1ig_2")

        TaskPlayAnim(ped, "missminuteman_1ig_2", "handsup_enter", 8.0, 8.0, 5000, 50, 0, false, false, false)

        busy = false
        handsup = true

        Citizen.Wait(500)
        puttinghandsup = false

        return;
    end

    if (surrender) then
        loadDict( "random@arrests" )
        loadDict("random@arrests@busted")
    
        TaskPlayAnim(ped, "random@arrests@busted", "exit", 8.0, 1.0, -1, 2, 0, 0, 0, 0 )
        Wait(3000)
        TaskPlayAnim(ped, "random@arrests", "kneeling_arrest_get_up", 8.0, 1.0, -1, 128, 0, 0, 0, 0 )
    end

    ClearPedTasks(ped)
    handsup = false;
    surrender = false;
    busy = false;
end)

local isSurrendering = function()
    return handsup or surrender or busy;
end

exports('isSurrendering', isSurrendering)