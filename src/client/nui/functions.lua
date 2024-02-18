local notify = false
local count = 0

local showNotify = function(title, type, message, timeout)
    if (#message > 61) then return end

    Citizen.CreateThread(function()
        if (notify) then
            SendReactMessage('showNotify', { visible = false })
            notify = false
        end

        SendReactMessage('showNotify', { visible = true, title = title, type = type, message = message })
        notify = true
        count = count + 1
        Citizen.CreateThread(function()
            local _count = count
            Citizen.Wait(timeout)
            if (count == _count) then
                SendReactMessage('showNotify', { visible = false })
            end
        end)
    end)
end

exports('showNotify', showNotify);