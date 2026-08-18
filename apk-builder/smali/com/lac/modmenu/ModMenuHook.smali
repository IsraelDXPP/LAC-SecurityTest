.class public Lcom/lac/modmenu/ModMenuHook;
.super Ljava/lang/Object;

.field public static overlay:Lcom/lac/modmenu/ModMenuOverlay;


# direct methods
.method public static init(Landroid/content/Context;)V
    .locals 2

    new-instance v0, Lcom/lac/modmenu/ModMenuOverlay;
    invoke-direct {v0, p0}, Lcom/lac/modmenu/ModMenuOverlay;-><init>(Landroid/content/Context;)V
    sput-object v0, Lcom/lac/modmenu/ModMenuHook;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    const-string v1, "MOD"
    invoke-virtual {v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->setText(Ljava/lang/CharSequence;)V

    return-void
.end method

.method public static isHackEnabled(Ljava/lang/String;)Z
    .locals 2

    sget-object v0, Lcom/lac/modmenu/ModMenuHook;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p0}, Lcom/lac/modmenu/ModMenuOverlay;->isHackEnabled(Ljava/lang/String;)Z
    move-result v0
    return v0

    :cond_0
    const/4 v0, 0x0
    return v0
.end method

.method public static toggleMenu()V
    .locals 2

    sget-object v0, Lcom/lac/modmenu/ModMenuHook;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Lcom/lac/modmenu/ModMenuOverlay;->toggleMenu()V

    :cond_0
    return-void
.end method
