.class public Lcom/lac/modmenu/ModMenuOverlay$1;
.super Ljava/lang/Object;
.implements Landroid/view/View$OnTouchListener;

# instance fields
.field final synthetic this$0:Lcom/lac/modmenu/ModMenuOverlay;


# direct methods
.method constructor <init>(Lcom/lac/modmenu/ModMenuOverlay;)V
    .locals 0

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    iput-object p1, p0, Lcom/lac/modmenu/ModMenuOverlay$1;->this$0:Lcom/lac/modmenu/ModMenuOverlay;

    return-void
.end method


# virtual methods
.method public onTouch(Landroid/view/View;Landroid/view/MotionEvent;)Z
    .locals 4

    invoke-virtual {p2}, Landroid/view/MotionEvent;->getAction()I

    move-result v0

    packed-switch v0, :pswitch_data_0

    goto :goto_0

    :pswitch_0
    iget-object v0, p0, Lcom/lac/modmenu/ModMenuOverlay$1;->this$0:Lcom/lac/modmenu/ModMenuOverlay;

    invoke-virtual {v0}, Lcom/lac/modmenu/ModMenuOverlay;->toggleMenu()V

    :goto_0
    const/4 v0, 0x1
    return v0

    nop

    :pswitch_data_0
    .packed-switch 0x1
        :pswitch_0
    .end packed-switch
.end method
