.class public Lcom/lac/modmenu/ModMenuOverlay$2;
.super Ljava/lang/Object;

# instance fields
.field final synthetic this$0:Lcom/lac/modmenu/ModMenuOverlay;
.field final synthetic val$hackName:Ljava/lang/String;
.field final synthetic val$wasEnabled:Z


# direct methods
.method constructor <init>(Lcom/lac/modmenu/ModMenuOverlay;Ljava/lang/String;Z)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->this$0:Lcom/lac/modmenu/ModMenuOverlay;

    iput-object p2, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->val$hackName:Ljava/lang/String;

    iput-boolean p3, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->val$wasEnabled:Z

    return-void
.end method


# virtual methods
.method public onClick(Landroid/view/View;)V
    .locals 3

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->this$0:Lcom/lac/modmenu/ModMenuOverlay;

    iget-object v1, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->val$hackName:Ljava/lang/String;

    iget-boolean v2, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->val$wasEnabled:Z

    if-nez v2, :cond_0

    const/4 v2, 0x1
    goto :goto_0

    :cond_0
    const/4 v2, 0x0

    :goto_0
    invoke-virtual {v0, v1, v2}, Lcom/lac/modmenu/ModMenuOverlay;->setHackState(Ljava/lang/String;Z)V

    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay$2;->this$0:Lcom/lac/modmenu/ModMenuOverlay;

    invoke-static {v0}, Lcom/lac/modmenu/ModMenuOverlay;->access$000(Lcom/lac/modmenu/ModMenuOverlay;)V

    return-void
.end method
