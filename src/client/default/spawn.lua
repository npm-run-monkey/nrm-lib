local function freezePlayer(id, freeze)
    local player = id
    SetPlayerControl(player, not freeze, false)

    local ped = GetPlayerPed(player)

    if not freeze then
        if not IsEntityVisible(ped) then
            SetEntityVisible(ped, true)
        end

        if not IsPedInAnyVehicle(ped) then
            SetEntityCollision(ped, true)
        end

        FreezeEntityPosition(ped, false)
        SetPlayerInvincible(player, false)
    else
        if IsEntityVisible(ped) then
            SetEntityVisible(ped, false)
        end

        SetEntityCollision(ped, false)
        FreezeEntityPosition(ped, true)
        SetPlayerInvincible(player, true)

        if not IsPedFatallyInjured(ped) then
            ClearPedTasksImmediately(ped)
        end
    end
end

local function spawnPlayer(spawn)
    spawn.x = spawn.x + 0.00
    spawn.y = spawn.y + 0.00
    spawn.z = spawn.z + 0.00
    spawn.heading = spawn.heading + 0.00

    DoScreenFadeOut(500)
    while not IsScreenFadedOut() do
        Citizen.Wait(0)
    end

    freezePlayer(PlayerId(), true)

    local model = GetHashKey('mp_m_freemode_01')

    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(0)
    end

    SetPlayerModel(PlayerId(), model)
    SetPedDefaultComponentVariation(PlayerPedId())
    SetModelAsNoLongerNeeded(model)

    RequestCollisionAtCoord(spawn.x, spawn.y, spawn.z)

    local ped = PlayerPedId()

    SetEntityCoordsNoOffset(ped, spawn.x, spawn.y, spawn.z, false, false, false, true)
    NetworkResurrectLocalPlayer(spawn.x, spawn.y, spawn.z, spawn.heading, true, true, false)
    ClearPlayerWantedLevel(PlayerId())

    TriggerServerEvent('nrm-lib:client:server:playerSpawned', GetPlayerServerId(PlayerId()));

    local time = GetGameTimer()

    while (not HasCollisionLoadedAroundEntity(ped) and (GetGameTimer() - time) < 5000) do
        Citizen.Wait(0)
    end

    ShutdownLoadingScreen()
    if IsScreenFadedOut() then
        DoScreenFadeIn(500)

        while not IsScreenFadedIn() do
            Citizen.Wait(0)
        end
    end

    freezePlayer(PlayerId(), false)
end

RegisterNetEvent('nrm-lib:server:client:spawnPlayer')

AddEventHandler('nrm-lib:server:client:spawnPlayer', function(coords)
    if (type(coords) == "string") then
        coords = json.decode(coords)
    end

    spawnPlayer({    
        x = coords.x,
        y = coords.y,
        z = coords.z,
        heading = coords.h,
    })
end)

Citizen.CreateThread(function()
    local ped = PlayerPedId();

    --if (not exports['nrm-lifeline'].getDefault()) then return end

    while true do
        Citizen.Wait(500)
        if (NetworkIsPlayerActive(PlayerId())) then
            DisplayRadar(false);

            SetCanAttackFriendly(ped, true, true);
            NetworkSetFriendlyFireOption(true);

            -- spawnPlayer({    
            --     x = 466.8401,
            --     y = 197.7201,
            --     z = 111.5291,
            --     heading = 291.71,
            -- })

            TriggerServerEvent('nrm-lib:client:server:NetworkActive')

            exports["nrm-lifeline"].setDefault(true);
            return;
        end
        Citizen.Wait(250)
    end
end)
