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

RegisterCommand('handsup', function()
    if (busy) then return end
    busy = true

    local ped = GetPlayerPed(-1)

    giveWeaponToPed("none")

    if (not handsup) then
        loadDict("missminuteman_1ig_2")

        TaskPlayAnim(ped, "missminuteman_1ig_2", "handsup_enter", 8.0, 8.0, 5000, 50, 0, false, false, false)

        Citizen.CreateThread(function()
            Citizen.Wait(5000)
            if (not surrender) then
                handsup = false
                return;
            end
            return;
        end)

        busy = false
        handsup = true
        return;
    end

    if (handsup and not surrender) then
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

    loadDict( "random@arrests" )
    loadDict("random@arrests@busted")

    TaskPlayAnim(ped, "random@arrests@busted", "exit", 8.0, 1.0, -1, 2, 0, 0, 0, 0 )
    Wait(3000)
    TaskPlayAnim(ped, "random@arrests", "kneeling_arrest_get_up", 8.0, 1.0, -1, 128, 0, 0, 0, 0 )

    ClearPedTasks(ped)
    handsup = false
    surrender = false
    busy = false
end)

RegisterCommand('clr', function()
    ClearPedTasks(GetPlayerPed(-1))
end)

local isSurrendering = function()
    return handsup or surrender or busy;
end

exports('isSurrendering', isSurrendering)