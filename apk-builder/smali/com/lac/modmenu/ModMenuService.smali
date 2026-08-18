.class public Lcom/lac/modmenu/ModMenuService;
.super Landroid/app/Service;

.field private overlay:Lcom/lac/modmenu/ModMenuOverlay;


# direct methods
.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, Landroid/app/Service;-><init>()V

    return-void
.end method


# virtual methods
.method public onBind(Landroid/content/Intent;)Landroid/os/IBinder;
    .locals 1

    const/4 v0, 0x0
    return-object v0
.end method

.method public onCreate()V
    .locals 3

    invoke-super {p0}, Landroid/app/Service;->onCreate()V

    new-instance v0, Lcom/lac/modmenu/ModMenuOverlay;
    invoke-direct {v0, p0}, Lcom/lac/modmenu/ModMenuOverlay;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuService;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    const-string v1, "MOD"
    invoke-virtual {v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->setText(Ljava/lang/CharSequence;)V

    const-string v0, "window"
    invoke-virtual {p0, v0}, Landroid/app/Service;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v0
    check-cast v0, Landroid/view/WindowManager;

    new-instance v1, Landroid/view/WindowManager$LayoutParams;
    invoke-direct {v1}, Landroid/view/WindowManager$LayoutParams;-><init>()V

    const/16 v2, 0x7d6
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->type:I

    const/16 v2, 0x28
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->flags:I

    const/4 v2, -0x2
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->width:I
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->height:I

    const/4 v2, 0x1
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->format:I

    iget-object v2, p0, Lcom/lac/modmenu/ModMenuService;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    invoke-virtual {v0, v2, v1}, Landroid/view/WindowManager;->addView(Landroid/view/View;Landroid/view/ViewGroup$LayoutParams;)V

    return-void
.end method

.method public onDestroy()V
    .locals 2

    invoke-super {p0}, Landroid/app/Service;->onDestroy()V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuService;->overlay:Lcom/lac/modmenu/ModMenuOverlay;

    if-eqz v0, :cond_0

    const-string v1, "window"
    invoke-virtual {p0, v1}, Landroid/app/Service;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v1
    check-cast v1, Landroid/view/WindowManager;

    invoke-virtual {v1, v0}, Landroid/view/WindowManager;->removeView(Landroid/view/View;)V

    :cond_0
    return-void
.end method

.method public onStartCommand(Landroid/content/Intent;II)I
    .locals 1

    const/4 v0, 0x1
    return v0
.end method
