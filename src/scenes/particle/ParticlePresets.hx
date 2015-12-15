package scenes.particle;

import pixi.core.textures.Texture;
import milkshake.core.ParticleEmitter;

class ParticlePresets
{
	public static var FIRE(get, null):ParticleEmitter;

	public static function get_FIRE():ParticleEmitter
	{
		return new ParticleEmitter(
		[
			Texture.fromImage('assets/images/particles/particle.png'),
			Texture.fromImage('assets/images/particles/fire.png')
		],
		{
			"alpha":
			{
				"start": 0.62,
				"end": 0
			},
			"scale":
			{
				"start": 0.25,
				"end": 0.75,
				"minimumScaleMultiplier": 1
			},
			"color":
			{
				"start": "#fff191",
				"end": "#ff622c"
			},
			"speed":
			{
				"start": 100,
				"end": 100
			},
			"acceleration":
			{
				"x": 3,
				"y": 0
			},
			"startRotation":
			{
				"min": 0,
				"max": 0
			},
			"rotationSpeed":
			{
				"min": 50,
				"max": 50
			},
			"lifetime":
			{
				"min": 0.1,
				"max": 0.5
			},
			"blendMode": "normal",
			"frequency": 0.001,
			"emitterLifetime": -1,
			"maxParticles": 1000,
			"pos":
			{
				"x": 0,
				"y": 0
			},
			"addAtBack": false,
			"spawnType": "circle",
			"spawnCircle":
			{
				"x": 0,
				"y": 0,
				"r": 10
			}
		});
	}
}
