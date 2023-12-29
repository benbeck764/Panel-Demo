using UnityEngine;

public class Startup : MonoBehaviour
{
    public void Start()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        // disable WebGLInput.captureAllKeyboardInput so elements in web page can handle keyboard inputs
        WebGLInput.captureAllKeyboardInput = false;
        Debug.Log("Disabled WebGLInput.captureAllKeyboardInput");
#endif
    }
}
