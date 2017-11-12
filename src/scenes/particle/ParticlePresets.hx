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

	public static var SNOW(get, null):ParticleEmitter;

	public static function get_SNOW():ParticleEmitter
	{
		return new ParticleEmitter(
		[
			Texture.fromImage('assets/images/particles/snow.png')
		],
		{
			"alpha": {
				"start": 0.73,
				"end": 0.46
			},
			"scale": {
				"start": 0.15,
				"end": 0.2,
				"minimumScaleMultiplier": 0.5
			},
			"color": {
				"start": "#ffffff",
				"end": "#ffffff"
			},
			"speed": {
				"start": 200,
				"end": 200,
				"minimumSpeedMultiplier": 1
			},
			"acceleration": {
				"x": 0,
				"y": 0
			},
			"maxSpeed": 0,
			"startRotation": {
				"min": 50,
				"max": 70
			},
			"noRotation": false,
			"rotationSpeed": {
				"min": 0,
				"max": 200
			},
			"lifetime": {
				"min": 4,
				"max": 4
			},
			"blendMode": "normal",
			"ease": [
				{
					"s": 0,
					"cp": 0.379,
					"e": 0.548
				},
				{
					"s": 0.548,
					"cp": 0.717,
					"e": 0.676
				},
				{
					"s": 0.676,
					"cp": 0.635,
					"e": 1
				}
			],
			"frequency": 0.004,
			"emitterLifetime": -1,
			"maxParticles": 1000,
			"pos": {
				"x": 0,
				"y": 0
			},
			"addAtBack": false,
			"spawnType": "rect",
			"spawnRect": {
				"x": -500,
				"y": -300,
				"w": 900,
				"h": 20
			}
		});
	}
}
