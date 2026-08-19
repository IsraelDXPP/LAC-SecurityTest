.class public Lcom/lac/modmenu/ModMenuOverlay;
.super Landroid/widget/LinearLayout;

# instance fields
.field private menuOpen:Z
.field public toggleButton:Landroid/widget/TextView;
.field private menuPanel:Landroid/widget/LinearLayout;
.field public layoutParams:Landroid/view/WindowManager$LayoutParams;
.field public windowManager:Landroid/view/WindowManager;

# Hack states
.field private godMode:Z
.field private infiniteHealth:Z
.field private unlimitedAmmo:Z
.field private speedHack:Z
.field private superJump:Z
.field private noRecoil:Z
.field private oneHitKill:Z
.field private vehicleGodMode:Z
.field private unlimitedFuel:Z
.field private viewAllPlayers:Z
.field private infiniteCoin:Z

.field private final MENU_BUTTON_SIZE:I
.field private final MENU_WIDTH:I
.field private final MENU_HEIGHT:I


.method public constructor <init>(Landroid/content/Context;)V
    .locals 3

    invoke-direct {p0, p1}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    const/4 v0, 0x0
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuOpen:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->godMode:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteHealth:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedAmmo:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->speedHack:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->superJump:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->noRecoil:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->oneHitKill:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->vehicleGodMode:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedFuel:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->viewAllPlayers:Z
    iput-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteCoin:Z

    const/16 v0, 0x3c
    iput v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->MENU_BUTTON_SIZE:I

    const/16 v0, 0xc8
    iput v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->MENU_WIDTH:I

    const/16 v0, 0x190
    iput v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->MENU_HEIGHT:I

    invoke-direct {p0, p1}, Lcom/lac/modmenu/ModMenuOverlay;->initOverlay(Landroid/content/Context;)V

    return-void
.end method

.method private initOverlay(Landroid/content/Context;)V
    .locals 6

    const-string v0, "window"
    invoke-virtual {p1, v0}, Landroid/content/Context;->getSystemService(Ljava/lang/String;)Ljava/lang/Object;

    move-result-object v0
    check-cast v0, Landroid/view/WindowManager;
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->windowManager:Landroid/view/WindowManager;

    new-instance v1, Landroid/view/WindowManager$LayoutParams;
    invoke-direct {v1}, Landroid/view/WindowManager$LayoutParams;-><init>()V
    iput-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->layoutParams:Landroid/view/WindowManager$LayoutParams;

    const/16 v2, 0x7f6
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->type:I

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->layoutParams:Landroid/view/WindowManager$LayoutParams;
    const/16 v2, 0x28
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->flags:I

    const/4 v2, -0x2
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->width:I
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->height:I

    const/4 v2, 0x1
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->format:I

    const/16 v2, 0x33
    iput v2, v1, Landroid/view/WindowManager$LayoutParams;->gravity:I

    invoke-direct {p0, p1}, Lcom/lac/modmenu/ModMenuOverlay;->createToggleButton(Landroid/content/Context;)V

    return-void
.end method

.method private createToggleButton(Landroid/content/Context;)V
    .locals 5

    new-instance v0, Landroid/widget/TextView;
    invoke-direct {v0, p1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;

    const-string v1, "MOD"
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    new-instance v0, Landroid/graphics/drawable/GradientDrawable;
    invoke-direct {v0}, Landroid/graphics/drawable/GradientDrawable;-><init>()V

    const/high16 v1, 0x42c80000    # 100.0f
    invoke-virtual {v0, v1}, Landroid/graphics/drawable/GradientDrawable;->setCornerRadius(F)V

    const/high16 v1, -0x1000000
    invoke-virtual {v0, v1}, Landroid/graphics/drawable/GradientDrawable;->setColor(I)V

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    invoke-virtual {v1, v0}, Landroid/widget/TextView;->setBackground(Landroid/graphics/drawable/Drawable;)V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    const/4 v1, -0x1
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    const/high16 v1, 0x41400000    # 12.0f
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextSize(F)V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    const/16 v1, 0x11
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setGravity(I)V

    const/16 v0, 0x3c
    iput v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->MENU_BUTTON_SIZE:I

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    new-instance v1, Lcom/lac/modmenu/ModMenuOverlay$1;
    invoke-direct {v1, p0}, Lcom/lac/modmenu/ModMenuOverlay$1;-><init>(Lcom/lac/modmenu/ModMenuOverlay;)V
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setOnTouchListener(Landroid/view/View$OnTouchListener;)V

    return-void
.end method

.method public showMenu()V
    .locals 3

    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->removeAllViews()V

    new-instance v0, Landroid/widget/LinearLayout;
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->getContext()Landroid/content/Context;
    move-result-object v1
    invoke-direct {v0, v1}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;

    const/4 v1, 0x1
    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setOrientation(I)V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    const/high16 v1, -0x1000000
    invoke-virtual {v0, v1}, Landroid/widget/LinearLayout;->setBackgroundColor(I)V

    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addTitle()V
    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addPlayerToggles()V
    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addVehicleToggles()V
    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addNetworkToggles()V
    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addGameToggles()V
    invoke-direct {p0}, Lcom/lac/modmenu/ModMenuOverlay;->addCredits()V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    invoke-virtual {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addView(Landroid/view/View;)V

    return-void
.end method

.method private addTitle()V
    .locals 3

    new-instance v0, Landroid/widget/TextView;
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->getContext()Landroid/content/Context;
    move-result-object v1
    invoke-direct {v0, v1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    const-string v1, "LAC Mod Menu v1.0\nBy IsraelProyects"
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    const/4 v1, -0x1
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    const/high16 v1, 0x41a00000    # 20.0f
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextSize(F)V

    const/16 v1, 0x11
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setGravity(I)V

    const/16 v1, 0xa
    const/4 v2, 0x0
    invoke-virtual {v0, v2, v1, v2, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    return-void
.end method

.method private addPlayerToggles()V
    .locals 2

    const-string v0, "--- PLAYER ---"
    invoke-direct {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addSectionLabel(Ljava/lang/String;)V

    const-string v0, "God Mode"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->godMode:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "Infinite Health"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteHealth:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "Unlimited Ammo"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedAmmo:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "Speed Hack"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->speedHack:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "Super Jump"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->superJump:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "No Recoil"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->noRecoil:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "One Hit Kill"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->oneHitKill:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    return-void
.end method

.method private addVehicleToggles()V
    .locals 2

    const-string v0, "--- VEHICLE ---"
    invoke-direct {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addSectionLabel(Ljava/lang/String;)V

    const-string v0, "Vehicle God Mode"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->vehicleGodMode:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    const-string v0, "Unlimited Fuel"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedFuel:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    return-void
.end method

.method private addNetworkToggles()V
    .locals 2

    const-string v0, "--- NETWORK ---"
    invoke-direct {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addSectionLabel(Ljava/lang/String;)V

    const-string v0, "View All Players"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->viewAllPlayers:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    return-void
.end method

.method private addGameToggles()V
    .locals 2

    const-string v0, "--- GAME ---"
    invoke-direct {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addSectionLabel(Ljava/lang/String;)V

    const-string v0, "Infinite Coin"
    iget-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteCoin:Z
    invoke-direct {p0, v0, v1}, Lcom/lac/modmenu/ModMenuOverlay;->addToggle(Ljava/lang/String;Z)V

    return-void
.end method

.method private addSectionLabel(Ljava/lang/String;)V
    .locals 3

    new-instance v0, Landroid/widget/TextView;
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->getContext()Landroid/content/Context;
    move-result-object v1
    invoke-direct {v0, v1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    invoke-virtual {v0, p1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    const/high16 v1, -0x10000
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    const/high16 v1, 0x41400000    # 12.0f
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextSize(F)V

    const/16 v1, 0x11
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setGravity(I)V

    const/16 v1, 0xa
    const/4 v2, 0x0
    invoke-virtual {v0, v2, v1, v2, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    return-void
.end method

.method private addToggle(Ljava/lang/String;Z)V
    .locals 4

    new-instance v0, Landroid/widget/TextView;
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->getContext()Landroid/content/Context;
    move-result-object v1
    invoke-direct {v0, v1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    if-eqz p2, :cond_0

    new-instance v1, Ljava/lang/StringBuilder;
    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V
    const-string v2, "[ON] "
    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;
    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;
    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;
    move-result-object v1
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    const/high16 v1, -0xff0000
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V
    goto :goto_0

    :cond_0
    new-instance v1, Ljava/lang/StringBuilder;
    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V
    const-string v2, "[OFF] "
    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;
    invoke-virtual {v1, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;
    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;
    move-result-object v1
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    const v1, -0x777778
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    :goto_0
    const/high16 v1, 0x41600000    # 14.0f
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextSize(F)V

    const/16 v1, 0xa
    const/4 v2, 0x0
    invoke-virtual {v0, v1, v2, v1, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    new-instance v1, Lcom/lac/modmenu/ModMenuOverlay$2;
    invoke-direct {v1, p0, p1, p2}, Lcom/lac/modmenu/ModMenuOverlay$2;-><init>(Lcom/lac/modmenu/ModMenuOverlay;Ljava/lang/String;Z)V
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setOnClickListener(Landroid/view/View$OnClickListener;)V

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    return-void
.end method

.method public toggleMenu()V
    .locals 2

    iget-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuOpen:Z

    if-eqz v0, :cond_0

    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->removeAllViews()V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->toggleButton:Landroid/widget/TextView;
    invoke-virtual {p0, v0}, Lcom/lac/modmenu/ModMenuOverlay;->addView(Landroid/view/View;)V

    const/4 v1, 0x0
    iput-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuOpen:Z
    goto :goto_0

    :cond_0
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->showMenu()V

    const/4 v1, 0x1
    iput-boolean v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuOpen:Z

    :goto_0
    return-void
.end method

.method public setHackState(Ljava/lang/String;Z)V
    .locals 1

    const-string v0, "godMode"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_0

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->godMode:Z

    :cond_0
    const-string v0, "infiniteHealth"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_1

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteHealth:Z

    :cond_1
    const-string v0, "unlimitedAmmo"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_2

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedAmmo:Z

    :cond_2
    const-string v0, "speedHack"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_3

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->speedHack:Z

    :cond_3
    const-string v0, "superJump"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_4

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->superJump:Z

    :cond_4
    const-string v0, "noRecoil"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_5

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->noRecoil:Z

    :cond_5
    const-string v0, "oneHitKill"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_6

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->oneHitKill:Z

    :cond_6
    const-string v0, "vehicleGodMode"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_7

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->vehicleGodMode:Z

    :cond_7
    const-string v0, "unlimitedFuel"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_8

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedFuel:Z

    :cond_8
    const-string v0, "viewAllPlayers"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_9

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->viewAllPlayers:Z

    :cond_9
    const-string v0, "infiniteCoin"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_a

    iput-boolean p2, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteCoin:Z

    :cond_a
    return-void
.end method

.method private addCredits()V
    .locals 3

    new-instance v0, Landroid/widget/TextView;
    invoke-virtual {p0}, Lcom/lac/modmenu/ModMenuOverlay;->getContext()Landroid/content/Context;
    move-result-object v1
    invoke-direct {v0, v1}, Landroid/widget/TextView;-><init>(Landroid/content/Context;)V

    const-string v1, "By IsraelProyects"
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setText(Ljava/lang/CharSequence;)V

    const v1, -0x777778
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextColor(I)V

    const/high16 v1, 0x41200000    # 10.0f
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setTextSize(F)V

    const/16 v1, 0x11
    invoke-virtual {v0, v1}, Landroid/widget/TextView;->setGravity(I)V

    const/16 v1, 0xa
    const/4 v2, 0x0
    invoke-virtual {v0, v1, v2, v1, v2}, Landroid/widget/TextView;->setPadding(IIII)V

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay;->menuPanel:Landroid/widget/LinearLayout;
    invoke-virtual {v1, v0}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    return-void
.end method

.method public isHackEnabled(Ljava/lang/String;)Z
    .locals 1

    const-string v0, "godMode"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_0

    iget-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->godMode:Z
    return v0

    :cond_0
    const-string v0, "infiniteHealth"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_1

    iget-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->infiniteHealth:Z
    return v0

    :cond_1
    const-string v0, "unlimitedAmmo"
    invoke-virtual {p1, v0}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :cond_2

    iget-boolean v0, p0, Lcom/lac/modmenu/ModMenuOverlay;->unlimitedAmmo:Z
    return v0

    :cond_2
    const/4 v0, 0x0
    return v0
.end method
