RegisterCommand('notify', function()
    SendReactMessage('showNotify', { visible = true, title = "test", type = "error", message = "Dit is een heeeeeleeeee lange test message! Whoooohh"})
end)