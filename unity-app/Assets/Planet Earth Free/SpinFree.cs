using UnityEngine;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

public class SpinSettings
{
    [JsonProperty("clockwise")]
    public bool Clockwise;
    [JsonProperty("speed")]
    public float Speed;
}

/// <summary>
/// Spin the object at a specified speed
/// </summary>
public class SpinFree : MonoBehaviour {

	// Interop with JSLib
    [DllImport("__Internal")]
    private static extern void DispatchEarthConfig(bool clockwise, float speed);

    [DllImport("__Internal")]
    private static extern void DispatchEarthConfigObject(string config);


    [Tooltip("Spin: Yes or No")]
	public bool spin;
	[Tooltip("Spin the parent object instead of the object this script is attached to")]
	public bool spinParent;
	public float speed = 10f;

	[HideInInspector]
	public bool clockwise = true;
	[HideInInspector]
	public float direction = 1f;
	[HideInInspector]
	public float directionChangeSpeed = 2f;

    private void Start()
    {
        DispatchEarthConfig(clockwise, speed);

        var config = new SpinSettings { Clockwise = clockwise, Speed = speed };
        var json = JsonConvert.SerializeObject(config);
        DispatchEarthConfigObject(json);
    }

    // Update is called once per frame
    void Update() {
		if (direction < 1f) {
			direction += Time.deltaTime / (directionChangeSpeed / 2);
		}

		if (spin) {
			if (clockwise) {
				if (spinParent)
					transform.parent.transform.Rotate(Vector3.up, (speed * direction) * Time.deltaTime);
				else
					transform.Rotate(Vector3.up, (speed * direction) * Time.deltaTime);
			} else {
				if (spinParent)
					transform.parent.transform.Rotate(-Vector3.up, (speed * direction) * Time.deltaTime);
				else
					transform.Rotate(-Vector3.up, (speed * direction) * Time.deltaTime);
			}
		}
	}

    public void SetClockwise(string newClockwise)
    {
        var clockWiseBool = bool.Parse(newClockwise);
        clockwise = clockWiseBool;
    }

    public void SetSpinSpeed(float newSpeed)
    {
        speed = newSpeed;
    }
    public void SetSpinSettingsString(string settingsJson)
    {
        var settings = JsonUtility.FromJson<SpinSettings>(settingsJson);    
        clockwise = settings.Clockwise;
        speed = settings.Speed;
    }

    public void SetSpinSettings(SpinSettings settings)
    {
		clockwise = settings.Clockwise;
        speed = settings.Speed;
    }
}