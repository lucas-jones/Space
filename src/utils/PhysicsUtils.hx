package utils;

import nape.geom.Vec2;
import milkshake.math.Vector2;

class PhysicsUtils
{
    public static inline function toVector2(value:Vec2):Vector2
    {
        return new Vector2(value.x, value.y);
    }

    public static inline function toVec2(value:Vector2):Vec2
    {
        return new Vec2(value.x, value.y);
    }
}