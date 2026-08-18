import { Overlay } from "./overlay";
import { log } from "../utils/logger";

export interface Widget {
  id: string;
  type: "toggle" | "slider" | "button" | "label";
  label: string;
  value: any;
  gameObject: any;
  callback: (value: any) => void;
}

export class WidgetFactory {
  private overlay: Overlay;
  private widgets: Map<string, Widget> = new Map();

  constructor(overlay: Overlay) {
    this.overlay = overlay;
  }

  createToggle(id: string, label: string, callback: (value: boolean) => void): Widget {
    const widget: Widget = {
      id,
      type: "toggle",
      label,
      value: false,
      gameObject: null,
      callback,
    };

    const toggleObj = new UnityEngine.GameObject(`Widget_${id}`);
    const rectTransform = toggleObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(280, 30);

    const toggle = toggleObj.AddComponent(132);
    toggle.isOn = false;

    const background = new UnityEngine.GameObject("Background");
    background.transform.SetParent(toggleObj.transform);
    const bgRect = background.AddComponent(11);
    bgRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchorMax = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchoredPosition = new UnityEngine.Vector2(15, 0);
    bgRect.sizeDelta = new UnityEngine.Vector2(40, 20);
    const bgImage = background.AddComponent(12);
    bgImage.color = new UnityEngine.Color(0.2, 0.2, 0.2, 1);

    const checkmark = new UnityEngine.GameObject("Checkmark");
    checkmark.transform.SetParent(background.transform);
    const checkRect = checkmark.AddComponent(11);
    checkRect.anchorMin = new UnityEngine.Vector2(0.2f, 0.2f);
    checkRect.anchorMax = new UnityEngine.Vector2(0.8f, 0.8f);
    checkRect.sizeDelta = UnityEngine.Vector2.zero;
    const checkImage = checkmark.AddComponent(12);
    checkImage.color = new UnityEngine.Color(0.2, 0.8, 0.2, 1);
    toggle.graphic = checkImage;

    const textObj = new UnityEngine.GameObject("Label");
    textObj.transform.SetParent(toggleObj.transform);
    const textRect = textObj.AddComponent(11);
    textRect.anchorMin = new UnityEngine.Vector2(0, 0);
    textRect.anchorMax = new UnityEngine.Vector2(1, 1);
    textRect.offsetMin = new UnityEngine.Vector2(60, 0);
    textRect.offsetMax = new UnityEngine.Vector2(-10, 0);
    const text = textObj.AddComponent(107);
    text.text = label;
    text.color = UnityEngine.Color.white;
    text.fontSize = 14;
    text.alignment = 3;

    widget.gameObject = toggleObj;
    this.widgets.set(id, widget);

    log.debug(`Created toggle widget: ${id}`);
    return widget;
  }

  createSlider(
    id: string,
    label: string,
    min: number,
    max: number,
    callback: (value: number) => void
  ): Widget {
    const widget: Widget = {
      id,
      type: "slider",
      label,
      value: min,
      gameObject: null,
      callback,
    };

    const sliderObj = new UnityEngine.GameObject(`Widget_${id}`);
    const rectTransform = sliderObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(280, 40);

    const slider = sliderObj.AddComponent(133);
    slider.minValue = min;
    slider.maxValue = max;
    slider.value = min;

    const background = new UnityEngine.GameObject("Background");
    background.transform.SetParent(sliderObj.transform);
    const bgRect = background.AddComponent(11);
    bgRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    bgRect.anchorMax = new UnityEngine.Vector2(1, 0.5f);
    bgRect.sizeDelta = new UnityEngine.Vector2(0, 5);
    const bgImage = background.AddComponent(12);
    bgImage.color = new UnityEngine.Color(0.3, 0.3, 0.3, 1);

    const fillArea = new UnityEngine.GameObject("Fill Area");
    fillArea.transform.SetParent(sliderObj.transform);
    const fillAreaRect = fillArea.AddComponent(11);
    fillAreaRect.anchorMin = new UnityEngine.Vector2(0, 0.5f);
    fillAreaRect.anchorMax = new UnityEngine.Vector2(1, 0.5f);
    fillAreaRect.offsetMin = new UnityEngine.Vector2(5, -5);
    fillAreaRect.offsetMax = new UnityEngine.Vector2(-5, 5);

    const fill = new UnityEngine.GameObject("Fill");
    fill.transform.SetParent(fillArea.transform);
    const fillRect = fill.AddComponent(11);
    fillRect.sizeDelta = new UnityEngine.Vector2(0, 0);
    const fillImage = fill.AddComponent(12);
    fillImage.color = new UnityEngine.Color(0.2, 0.6, 0.2, 1);
    slider.fillRect = fillRect;

    const handleArea = new UnityEngine.GameObject("Handle Slide Area");
    handleArea.transform.SetParent(sliderObj.transform);
    const handleAreaRect = handleArea.AddComponent(11);
    handleAreaRect.anchorMin = UnityEngine.Vector2.zero;
    handleAreaRect.anchorMax = UnityEngine.Vector2.one;
    handleAreaRect.offsetMin = new UnityEngine.Vector2(10, 0);
    handleAreaRect.offsetMax = new UnityEngine.Vector2(-10, 0);

    const handle = new UnityEngine.GameObject("Handle");
    handle.transform.SetParent(handleArea.transform);
    const handleRect = handle.AddComponent(11);
    handleRect.sizeDelta = new UnityEngine.Vector2(20, 0);
    const handleImage = handle.AddComponent(12);
    handleImage.color = UnityEngine.Color.white;
    slider.handleRect = handleRect;

    const labelObj = new UnityEngine.GameObject("Label");
    labelObj.transform.SetParent(sliderObj.transform);
    const labelText = labelObj.AddComponent(107);
    labelText.text = `${label}: ${min}`;
    labelText.color = UnityEngine.Color.white;
    labelText.fontSize = 12;
    labelText.alignment = 1;

    widget.gameObject = sliderObj;
    this.widgets.set(id, widget);

    log.debug(`Created slider widget: ${id}`);
    return widget;
  }

  createButton(id: string, label: string, callback: () => void): Widget {
    const widget: Widget = {
      id,
      type: "button",
      label,
      value: null,
      gameObject: null,
      callback,
    };

    const buttonObj = new UnityEngine.GameObject(`Widget_${id}`);
    const rectTransform = buttonObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(280, 35);

    const button = buttonObj.AddComponent(13);
    const colors = button.colors;
    colors.normalColor = new UnityEngine.Color(0.3, 0.3, 0.3, 1);
    colors.highlightedColor = new UnityEngine.Color(0.4, 0.4, 0.4, 1);
    colors.pressedColor = new UnityEngine.Color(0.2, 0.2, 0.2, 1);
    button.colors = colors;

    const textObj = new UnityEngine.GameObject("Text");
    textObj.transform.SetParent(buttonObj.transform);
    const textRect = textObj.AddComponent(11);
    textRect.anchorMin = UnityEngine.Vector2.zero;
    textRect.anchorMax = UnityEngine.Vector2.one;
    textRect.sizeDelta = UnityEngine.Vector2.zero;
    const text = textObj.AddComponent(107);
    text.text = label;
    text.color = UnityEngine.Color.white;
    text.fontSize = 14;
    text.alignment = 4;

    widget.gameObject = buttonObj;
    this.widgets.set(id, widget);

    log.debug(`Created button widget: ${id}`);
    return widget;
  }

  createLabel(id: string, label: string): Widget {
    const widget: Widget = {
      id,
      type: "label",
      label,
      value: null,
      gameObject: null,
      callback: () => { },
    };

    const labelObj = new UnityEngine.GameObject(`Widget_${id}`);
    const rectTransform = labelObj.AddComponent(11);
    rectTransform.sizeDelta = new UnityEngine.Vector2(280, 25);

    const text = labelObj.AddComponent(107);
    text.text = label;
    text.color = UnityEngine.Color.white;
    text.fontSize = 12;
    text.alignment = 3;

    widget.gameObject = labelObj;
    this.widgets.set(id, widget);

    log.debug(`Created label widget: ${id}`);
    return widget;
  }

  getWidget(id: string): Widget | undefined {
    return this.widgets.get(id);
  }

  updateWidgetValue(id: string, value: any): void {
    const widget = this.widgets.get(id);
    if (widget) {
      widget.value = value;
      widget.callback(value);
      log.debug(`Widget ${id} updated to ${value}`);
    }
  }

  clearWidgets(): void {
    for (const widget of this.widgets.values()) {
      UnityEngine.Object.Destroy(widget.gameObject);
    }
    this.widgets.clear();
  }

  destroyWidget(id: string): void {
    const widget = this.widgets.get(id);
    if (widget) {
      UnityEngine.Object.Destroy(widget.gameObject);
      this.widgets.delete(id);
    }
  }
}
