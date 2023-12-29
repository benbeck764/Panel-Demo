using TMPro;
using UnityEngine;

public class UpdateText : MonoBehaviour
{
    public TMP_Text myText ; // Reference to the Text component on your Canvas Text object

    void Start()
    {
        // Assuming you have assigned the Text component in the Unity Editor
        if (myText == null)
        {
            Debug.LogError("Text component not assigned!");
        }
    }

    public void UpdateTextContent(string newText)
    {
        myText.text = newText;
    }
}
