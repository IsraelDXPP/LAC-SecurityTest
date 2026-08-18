import { log, LogLevel } from "../utils/logger";
import { AntiDetect } from "../utils/anti-detect";

const MENU_WIDTH = 300;
const MENU_HEIGHT = 400;
const TAB_HEIGHT = 40;
const WIDGET_HEIGHT = 50;
const PADDING = 10;

export class Overlay {
  private visible = false;
  private menuObject: any = null;
  private dragArea: any = null;
  private contentPanel: any = null;
  private currentTab = "player";
  private tabs: Map<string, any> = new Map();
  private widgets: Map<string, any> = new Map();
  private onToggleCallback: ((visible: boolean) => void) | null = null;

  constructor() {
    this.createMenu();
  }

  private createMenu(): void {
    this.menuObject = new UnityEngine.GameObject("LACSecurityTest");
    UnityEngine.Object.DontDestroyOnLoad(this.menuObject);

    const canvas = this.menuObject.AddComponent(22);
    canvas.renderMode = 0;
    canvas.sortingOrder = 9999;

    this.createDragArea();
    this.createContentPanel();
    this.createTabs();
    this.createWidgets();

    this.menuObject.SetActive(false);
    this.visible = false;

    log.info("Menu overlay created");
  }

  private createDragArea(): void {
    const dragObj = new UnityEngine.GameObject("DragArea");
    dragObj.transform.SetParent(this.menuObject.transform);

    const rectTransform = dragObj.AddComponent(11);
    rectTransform.anchoredPosition = new UnityEngine.Vector2(0, MENU_HEIGHT / 2 - TAB_HEIGHT / 2);
    rectTransform.sizeDelta = new UnityEngine.Vector2(MENU_WIDTH, TAB_HEIGHT);

    const image = dragObj.AddComponent(12);
    image.color = new UnityEngine.Color(0.1, 0.1, 0.1, 0.8);

    this.dragArea = dragObj;
  }

  private createContentPanel(): void {
    const contentObj = new UnityEngine.GameObject("Content");
    contentObj.transform.SetParent(this.menuObject.transform);

    const rectTransform = contentObj.AddComponent(11);
    rectTransform.anchoredPosition = new UnityEngine.Vector2(0, -TAB_HEIGHT / 2);
    rectTransform.sizeDelta = new UnityEngine.Vector2(MENU_WIDTH, MENU_HEIGHT - TAB_HEIGHT);

    const image = contentObj.AddComponent(12);
    image.color = new UnityEngine.Color(0.05, 0.05, 0.05, 0.9);

    const layout = contentObj.AddComponent(152);
    layout.spacing = PADDING;
    layout.padding = new UnityEngine.RectOffset(PADDING, PADDING, PADDING, PADDING);

    this.contentPanel = contentObj;
  }

  private createTabs(): void {
    const tabNames = ["Player", "Vehicle", "Network", "Editor", "Game"];

    for (let i = 0; i < tabNames.length; i++) {
      const tabObj = new UnityEngine.GameObject(`Tab_${tabNames[i]}`);
      tabObj.transform.SetParent(this.menuObject.transform);

      const rectTransform = tabObj.AddComponent(11);
      rectTransform.anchoredPosition = new UnityEngine.Vector2(
        (i - (tabNames.length - 1) / 2) * (MENU_WIDTH / tabNames.length),
        MENU_HEIGHT / 2 - TAB_HEIGHT / 2
      );
      rectTransform.sizeDelta = new UnityEngine.Vector2(MENU_WIDTH / tabNames.length - PADDING, TAB_HEIGHT - PADDING);

      const button = tabObj.AddComponent(13);
      const colors = button.colors;
      colors.normalColor = new UnityEngine.Color(0.2, 0.2, 0.2, 0.8);
      colors.highlightedColor = new UnityEngine.Color(0.3, 0.3, 0.3, 0.9);
      colors.pressedColor = new UnityEngine.Color(0.1, 0.1, 0.1, 0.7);
      button.colors = colors;

      const textObj = new UnityEngine.GameObject("Text");
      textObj.transform.SetParent(tabObj.transform);

      const textRectTransform = textObj.AddComponent(11);
      textRectTransform.anchorMin = UnityEngine.Vector2.zero;
      textRectTransform.anchorMax = UnityEngine.Vector2.one;
      textRectTransform.sizeDelta = UnityEngine.Vector2.zero;

      const text = textObj.AddComponent(107);
      text.text = tabNames[i];
      text.color = UnityEngine.Color.white;
      text.fontSize = 14;
      text.alignment = 4;

      this.tabs.set(tabNames[i].toLowerCase(), tabObj);
    }
  }

  private createWidgets(): void {
    // Widgets are created dynamically when switching tabs
  }

  createToggle(label: string, callback: (value: boolean) => void): void {
    const toggleObj = new UnityEngine.GameObject(`Toggle_${label}`);
    toggleObj.transform.SetParent(this.contentPanel.transform);

    const rectTransform = toggleObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(MENU_WIDTH - PADDING * 2, 30);

    const toggle = toggleObj.AddComponent(132);
    toggle.isOn = false;

    const backgroundObj = new UnityEngine.GameObject("Background");
    backgroundObj.transform.SetParent(toggleObj.transform);

    const bgRect = backgroundObj.AddComponent(11);
    bgRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchorMax = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchoredPosition = new UnityEngine.Vector2(15, 0);
    bgRect.sizeDelta = new UnityEngine.Vector2(40, 20);

    const bgImage = backgroundObj.AddComponent(12);
    bgImage.color = new UnityEngine.Color(0.2, 0.2, 0.2, 1);

    const checkObj = new UnityEngine.GameObject("Checkmark");
    checkObj.transform.SetParent(backgroundObj.transform);

    const checkRect = checkObj.AddComponent(11);
    checkRect.anchorMin = new UnityEngine.Vector2(0.2f, 0.2f);
    checkRect.anchorMax = new UnityEngine.Vector2(0.8f, 0.8f);
    checkRect.sizeDelta = UnityEngine.Vector2.zero;

    const checkImage = checkObj.AddComponent(12);
    checkImage.color = new UnityEngine.Color(0.2, 0.8, 0.2, 1);

    toggle.graphic = checkImage;

    const labelObj = new UnityEngine.GameObject("Label");
    labelObj.transform.SetParent(toggleObj.transform);

    const labelRect = labelObj.AddComponent(11);
    labelRect.anchorMin = new UnityEngine.Vector2(0, 0);
    labelRect.anchorMax = new UnityEngine.Vector2(1, 1);
    labelRect.offsetMin = new UnityEngine.Vector2(60, 0);
    labelRect.offsetMax = new UnityEngine.Vector2(-10, 0);

    const text = labelObj.AddComponent(107);
    text.text = label;
    text.color = UnityEngine.Color.white;
    text.fontSize = 14;
    text.alignment = 3;

    this.widgets.set(label, toggleObj);

    // We'd need to hook into Unity's button system for the callback
    // This is a simplified version
  }

  createSlider(label: string, min: number, max: number, callback: (value: number) => void): void {
    const sliderObj = new UnityEngine.GameObject(`Slider_${label}`);
    sliderObj.transform.SetParent(this.contentPanel.transform);

    const rectTransform = sliderObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(MENU_WIDTH - PADDING * 2, 40);

    const slider = sliderObj.AddComponent(133);
    slider.minValue = min;
    slider.maxValue = max;
    slider.value = min;

    const backgroundObj = new UnityEngine.GameObject("Background");
    backgroundObj.transform.SetParent(sliderObj.transform);

    const bgRect = backgroundObj.AddComponent(11);
    bgRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchorMax = new UnityEngine.Vector2(1, 0.5f);
    bgRect.sizeDelta = new UnityEngine.Vector2(0, 5);

    const bgImage = backgroundObj.AddComponent(12);
    bgImage.color = new UnityEngine.Color(0.3, 0.3, 0.3, 1);

    const fillAreaObj = new UnityEngine.GameObject("Fill Area");
    fillAreaObj.transform.SetParent(sliderObj.transform);

    const fillAreaRect = fillAreaObj.AddComponent(11);
    fillAreaRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    fillAreaRect.anchorMax = new UnityEngine.Vector2(1, 0.5f);
    fillAreaRect.offsetMin = new UnityEngine.Vector2(5, -5);
    fillAreaRect.offsetMax = new UnityEngine.Vector2(-5, 5);

    const fillObj = new UnityEngine.GameObject("Fill");
    fillObj.transform.SetParent(fillAreaObj.transform);

    const fillRect = fillObj.AddComponent(11);
    fillRect.sizeDelta = new UnityEngine.Vector2(0, 0);

    const fillImage = fillObj.AddComponent(12);
    fillImage.color = new UnityEngine.Color(0.2, 0.6, 0.2, 1);

    slider.fillRect = fillRect;

    const handleAreaObj = new UnityEngine.GameObject("Handle Slide Area");
    handleAreaObj.transform.SetParent(sliderObj.transform);

    const handleAreaRect = handleAreaObj.AddComponent(11);
    handleAreaRect.anchorMin = UnityEngine.Vector2.zero;
    handleAreaRect.anchorMax = UnityEngine.Vector2.one;
    handleAreaRect.offsetMin = new UnityEngine.Vector2(10, 0);
    handleAreaRect.offsetMax = new UnityEngine.Vector2(-10, 0);

    const handleObj = new UnityEngine.GameObject("Handle");
    handleObj.transform.SetParent(handleAreaObj.transform);

    const handleRect = handleObj.AddComponent(11);
    handleRect.sizeDelta = new UnityEngine.Vector2(20, 0);

    const handleImage = handleObj.AddComponent(12);
    handleImage.color = UnityEngine.Color.white;

    slider.handleRect = handleRect;

    this.widgets.set(label, sliderObj);
  }

  toggleMenu(): void {
    this.visible = !this.visible;
    this.menuObject.SetActive(this.visible);

    if (this.onToggleCallback) {
      this.onToggleCallback(this.visible);
    }

    log.info(`Menu ${this.visible ? "shown" : "hidden"}`);
  }

  isMenuVisible(): boolean {
    return this.visible;
  }

  onToggle(callback: (visible: boolean) => void): void {
    this.onToggleCallback = callback;
  }

  switchTab(tabName: string): void {
    this.currentTab = tabName.toLowerCase();
    // Clear current widgets and load new ones
    this.clearWidgets();
    this.loadTabWidgets(this.currentTab);
    log.info(`Switched to tab: ${tabName}`);
  }

  private clearWidgets(): void {
    for (const widget of this.widgets.values()) {
      UnityEngine.Object.Destroy(widget);
    }
    this.widgets.clear();
  }

  private loadTabWidgets(tabName: string): void {
    // Widget loading will be handled by the main overlay
    switch (tabName) {
      case "player":
        this.loadPlayerWidgets();
        break;
      case "vehicle":
        this.loadVehicleWidgets();
        break;
      case "network":
        this.loadNetworkWidgets();
        break;
      case "editor":
        this.loadEditorWidgets();
        break;
      case "game":
        this.loadGameWidgets();
        break;
    }
  }

  private loadPlayerWidgets(): void {
    this.createToggle("God Mode", (v) => { });
    this.createToggle("Infinite Health", (v) => { });
    this.createToggle("Unlimited Ammo", (v) => { });
    this.createToggle("No Recoil", (v) => { });
    this.createToggle("One Hit Kill", (v) => { });
    this.createSlider("Speed Multiplier", 1, 10, (v) => { });
    this.createSlider("Jump Multiplier", 1, 10, (v) => { });
  }

  private loadVehicleWidgets(): void {
    this.createToggle("Vehicle God Mode", (v) => { });
    this.createToggle("Unlimited Fuel", (v) => { });
    this.createToggle("Super Speed", (v) => { });
    this.createToggle("Always Drift", (v) => { });
    this.createToggle("Rainbow Car", (v) => { });
    this.createSlider("Speed Multiplier", 1, 10, (v) => { });
  }

  private loadNetworkWidgets(): void {
    this.createToggle("View All Players", (v) => { });
    this.createToggle("View All Vehicles", (v) => { });
    this.createToggle("See All Chat", (v) => { });
    this.createToggle("Force Unlock", (v) => { });
    this.createToggle("Join Any Vehicle", (v) => { });
    this.createToggle("Voice Chat All", (v) => { });
  }

  private loadEditorWidgets(): void {
    this.createToggle("Invincible", (v) => { });
    this.createToggle("Editor Mode", (v) => { });
    this.createToggle("Toggle AI", (v) => { });
    this.createToggle("Spawn Props", (v) => { });
    this.createToggle("Time Control", (v) => { });
    this.createSlider("Custom Time", 0, 24, (v) => { });
  }

  private loadGameWidgets(): void {
    this.createToggle("Infinite Coin", (v) => { });
    this.createToggle("Infinite Dice", (v) => { });
    this.createToggle("Kill All Zombies", (v) => { });
    this.createToggle("Spawn Zombies", (v) => { });
    this.createToggle("Start Round", (v) => { });
    this.createToggle("Override Role", (v) => { });
    this.createSlider("Zombie Count", 1, 100, (v) => { });
  }

  destroy(): void {
    UnityEngine.Object.Destroy(this.menuObject);
    log.info("Menu overlay destroyed");
  }
}
