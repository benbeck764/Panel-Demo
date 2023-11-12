using UnityEngine;

public class NavigationMenu : MonoBehaviour
{
    public void OnNavigateDashboardClick()
    {
        Application.OpenURL("http://localhost:5173/dashboard");
    }
}
