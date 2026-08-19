.class public Lcom/lac/modmenu/ModMenuActivity;
.super Lcom/unity3d/player/UnityPlayerActivity;

# instance fields
.field private modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;


# direct methods
.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, Lcom/unity3d/player/UnityPlayerActivity;-><init>()V

    return-void
.end method


# virtual methods
.method protected onCreate(Landroid/os/Bundle;)V
    .locals 4

    invoke-super {p0, p1}, Lcom/unity3d/player/UnityPlayerActivity;->onCreate(Landroid/os/Bundle;)V

    new-instance v0, Lcom/lac/modmenu/ModMenuOverlay;
    invoke-direct {v0, p0}, Lcom/lac/modmenu/ModMenuOverlay;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuActivity;->modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;

    new-instance v1, Lcom/lac/modmenu/ModMenuActivity$1;
    invoke-direct {v1, p0}, Lcom/lac/modmenu/ModMenuActivity$1;-><init>(Lcom/lac/modmenu/ModMenuActivity;)V
    invoke-virtual {v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    iget-object v2, v0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    invoke-virtual {v0, v2}, Lcom/lac/modmenu/ModMenuOverlay;->addView(Landroid/view/View;)V

    const-string v1, "window"
    invoke-virtual {p0, v1}, Lcom/lac/modmenu/ModMenuActivity;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;
    move-result-object v1
    check-cast v1, Landroid/view/WindowManager;

    iget-object v2, p0, Lcom/lac/modmenu/ModMenuActivity;->modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;
    iget-object v3, v2, Lcom/lac/modmenu/ModMenuOverlay;->layoutParams:Landroid/view/WindowManager$LayoutParams;
    invoke-interface {v1, v2, v3}, Landroid/view/WindowManager;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method public getModMenu()Lcom/lac/modmenu/ModMenuOverlay;
    .locals 1

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuActivity;->modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;
    return-object v0
.end method

.method public isHackEnabled(Ljava/lang/String;)Z
    .locals 1

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuActivity;->modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Lcom/lac/modmenu/ModMenuOverlay;->isHackEnabled(Ljava/lang/String;)Z
    move-result v0
    return v0

    :cond_0
    const/4 v0, 0x0
    return v0
.end method
