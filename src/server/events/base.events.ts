// Default
import Entity from "Entity/Entity";

// Helpers
import Player from "Entity/classes/Player";

on('playerJoining', () =>
{
    const player: Entity = new Player(global.source);
});