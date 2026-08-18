.class public Lcom/lac/modmenu/ModMenuActivity$1;
.super Ljava/lang/Object;

# instance fields
.field final synthetic this$0:Lcom/lac/modmenu/ModMenuActivity;


# direct methods
.method constructor <init>(Lcom/lac/modmenu/ModMenuActivity;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/lac/modmenu/ModMenuActivity$1;->this$0:Lcom/lac/modmenu/ModMenuActivity;

    return-void
.end method


# virtual methods
.method public onClick(Landroid/view/View;)V
    .locals 1

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuActivity$1;->this$0:Lcom/lac/modmenu/ModMenuActivity;

    invoke-virtual {v0}, Lcom/lac/modmenu/ModMenuActivity;->getModMenu()Lcom/lac/modmenu/ModMenuOverlay;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Lcom/lac/modmenu/ModMenuOverlay;->toggleMenu()V

    :cond_0
    return-void
.end method
