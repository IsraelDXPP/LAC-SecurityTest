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
    .locals 2

    invoke-super {p0, p1}, Lcom/unity3d/player/UnityPlayerActivity;->onCreate(Landroid/os/Bundle;)V

    new-instance v0, Lcom/lac/modmenu/ModMenuOverlay;
    invoke-direct {v0, p0}, Lcom/lac/modmenu/ModMenuOverlay;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuActivity;->modMenuOverlay:Lcom/lac/modmenu/ModMenuOverlay;

    return-void
.end method
