using UnityEngine;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

/// <summary>
/// Spin the object at a specified speed
/// </summary>
public class SpinFree : MonoBehaviour {

	// Interop with JSLib
    [DllImport("__Internal")]
    private static extern void DispatchEarthConfig(bool clockwise, float speed);

    [DllImport("__Internal")]
    private static extern void DispatchEarthConfigDto(string dto);


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
        // Dispatch multiple params
        //DispatchEarthConfig(clockwise, speed);

        // Dispatch JSON
        var dto = (new EarthConfig { Clockwise = clockwise, Speed = speed }).ToString();
        DispatchEarthConfigDto(dto);
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
    public void SetEarthConfigString(string earthConfigJson)
    {
        var earthConfig = JsonUtility.FromJson<EarthConfig>(earthConfigJson);    
        clockwise = earthConfig.Clockwise;
        speed = earthConfig.Speed;
    }

    public void SetEarthConfig(EarthConfig earthConfig)
    {
		clockwise = earthConfig.Clockwise;
        speed = earthConfig.Speed;
    }
}