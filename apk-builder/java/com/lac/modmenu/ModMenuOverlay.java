package com.lac.modmenu;

import android.animation.ValueAnimator;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.GradientDrawable;
import android.os.Handler;
import android.os.Looper;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Switch;
import android.widget.TextView;

import java.util.LinkedHashMap;
import java.util.Map;

public class ModMenuOverlay extends FrameLayout {

    private WindowManager windowManager;
    private WindowManager.LayoutParams overlayParams;
    private boolean menuOpen = false;

    private LinearLayout floatingButton;
    private LinearLayout menuPanel;
    private ScrollView scrollView;

    private final Map<String, Boolean> hacks = new LinkedHashMap<>();
    private static final int COLOR_BG = Color.parseColor("#1E1E2E");
    private static final int COLOR_CARD = Color.parseColor("#2A2A3C");
    private static final int COLOR_ACCENT = Color.parseColor("#7C3AED");
    private static final int COLOR_TEXT = Color.parseColor("#E0E0E0");
    private static final int COLOR_DIM = Color.parseColor("#888888");
    private static final int COLOR_GREEN = Color.parseColor("#22C55E");
    private static final int COLOR_RED = Color.parseColor("#EF4444");
    private static final int COLOR_SECTION = Color.parseColor("#A78BFA");

    public ModMenuOverlay(Context context) {
        super(context);
        hacks.put("godMode", false);
        hacks.put("infiniteHealth", false);
        hacks.put("unlimitedAmmo", false);
        hacks.put("speedHack", false);
        hacks.put("superJump", false);
        hacks.put("noRecoil", false);
        hacks.put("oneHitKill", false);
        hacks.put("vehicleGodMode", false);
        hacks.put("unlimitedFuel", false);
        hacks.put("viewAllPlayers", false);
        hacks.put("infiniteCoin", false);

        windowManager = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);

        overlayParams = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
                android.graphics.PixelFormat.TRANSLUCENT
        );
        overlayParams.gravity = Gravity.TOP | Gravity.START;
        overlayParams.x = 20;
        overlayParams.y = 200;

        createFloatingButton();
        addView(floatingButton);

        windowManager.addView(this, overlayParams);
    }

    private void createFloatingButton() {
        floatingButton = new LinearLayout(getContext());
        floatingButton.setOrientation(LinearLayout.HORIZONTAL);
        floatingButton.setGravity(Gravity.CENTER);

        GradientDrawable bg = new GradientDrawable();
        bg.setShape(GradientDrawable.OVAL);
        bg.setColor(COLOR_ACCENT);
        bg.setStroke(dp(2), Color.parseColor("#9F67FF"));
        floatingButton.setBackground(bg);
        floatingButton.setPadding(dp(4), dp(4), dp(4), dp(4));

        TextView tv = new TextView(getContext());
        tv.setText("MOD");
        tv.setTextColor(Color.WHITE);
        tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, 13);
        tv.setTypeface(Typeface.DEFAULT_BOLD);
        tv.setGravity(Gravity.CENTER);
        floatingButton.addView(tv, new LinearLayout.LayoutParams(dp(44), dp(44)));

        makeDraggable(floatingButton, overlayParams);

        floatingButton.setOnClickListener(v -> {
            menuOpen = true;
            showMenu();
        });
    }

    private void makeDraggable(View view, WindowManager.LayoutParams params) {
        final float[] touchX = new float[1];
        final float[] touchY = new float[1];
        final int[] startX = new int[1];
        final int[] startY = new int[1];
        final boolean[] moved = new boolean[1];

        view.setOnTouchListener((v, event) -> {
            switch (event.getActionMasked()) {
                case MotionEvent.ACTION_DOWN:
                    touchX[0] = event.getRawX();
                    touchY[0] = event.getRawY();
                    startX[0] = params.x;
                    startY[0] = params.y;
                    moved[0] = false;
                    return true;
                case MotionEvent.ACTION_MOVE:
                    float dx = event.getRawX() - touchX[0];
                    float dy = event.getRawY() - touchY[0];
                    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                        moved[0] = true;
                    }
                    params.x = startX[0] + (int) dx;
                    params.y = startY[0] + (int) dy;
                    try {
                        windowManager.updateViewLayout(ModMenuOverlay.this, params);
                    } catch (Exception ignored) {}
                    return true;
                case MotionEvent.ACTION_UP:
                    if (!moved[0]) {
                        v.performClick();
                    }
                    return true;
            }
            return false;
        });
    }

    private void showMenu() {
        removeAllViews();

        menuPanel = new LinearLayout(getContext());
        menuPanel.setOrientation(LinearLayout.VERTICAL);
        GradientDrawable menuBg = new GradientDrawable();
        menuBg.setCornerRadius(dp(16));
        menuBg.setColor(COLOR_BG);
        menuBg.setStroke(1, Color.parseColor("#3A3A4C"));
        menuPanel.setBackground(menuBg);
        menuPanel.setPadding(dp(16), dp(12), dp(16), dp(12));

        LinearLayout titleBar = new LinearLayout(getContext());
        titleBar.setOrientation(LinearLayout.HORIZONTAL);
        titleBar.setGravity(Gravity.CENTER_VERTICAL);

        TextView title = new TextView(getContext());
        title.setText("LAC Mod Menu");
        title.setTextColor(COLOR_TEXT);
        title.setTextSize(TypedValue.COMPLEX_UNIT_SP, 17);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        titleBar.addView(title, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        TextView minimizeBtn = makeCircleButton("-", COLOR_DIM);
        minimizeBtn.setOnClickListener(v -> {
            menuOpen = false;
            removeAllViews();
            addView(floatingButton);
        });
        titleBar.addView(minimizeBtn);

        TextView spacer = new TextView(getContext());
        spacer.setWidth(dp(8));
        titleBar.addView(spacer);

        TextView closeBtn = makeCircleButton("X", COLOR_RED);
        closeBtn.setOnClickListener(v -> {
            menuOpen = false;
            removeAllViews();
            try {
                windowManager.removeView(ModMenuOverlay.this);
            } catch (Exception ignored) {}
        });
        titleBar.addView(closeBtn);

        menuPanel.addView(titleBar);
        menuPanel.addView(makeDivider());

        makeDraggable(menuPanel, overlayParams);

        scrollView = new ScrollView(getContext());
        LinearLayout content = new LinearLayout(getContext());
        content.setOrientation(LinearLayout.VERTICAL);

        addSection(content, "PLAYER");
        addSwitch(content, "God Mode", "godMode");
        addSwitch(content, "Infinite Health", "infiniteHealth");
        addSwitch(content, "Unlimited Ammo", "unlimitedAmmo");
        addSwitch(content, "Speed Hack", "speedHack");
        addSwitch(content, "Super Jump", "superJump");
        addSwitch(content, "No Recoil", "noRecoil");
        addSwitch(content, "One Hit Kill", "oneHitKill");

        addSection(content, "VEHICLE");
        addSwitch(content, "Vehicle God Mode", "vehicleGodMode");
        addSwitch(content, "Unlimited Fuel", "unlimitedFuel");

        addSection(content, "NETWORK");
        addSwitch(content, "View All Players", "viewAllPlayers");

        addSection(content, "GAME");
        addSwitch(content, "Infinite Coin", "infiniteCoin");

        TextView credits = new TextView(getContext());
        credits.setText("By IsraelProyects");
        credits.setTextColor(COLOR_DIM);
        credits.setTextSize(TypedValue.COMPLEX_UNIT_SP, 11);
        credits.setGravity(Gravity.CENTER);
        credits.setPadding(0, dp(12), 0, dp(4));
        content.addView(credits);

        scrollView.addView(content);
        menuPanel.addView(scrollView);

        FrameLayout.LayoutParams menuLp = new FrameLayout.LayoutParams(dp(260), ViewGroup.LayoutParams.WRAP_CONTENT);
        menuLp.gravity = Gravity.CENTER;
        addView(menuPanel, menuLp);

        animateIn();
    }

    private void addSection(LinearLayout parent, String name) {
        TextView tv = new TextView(getContext());
        tv.setText(name);
        tv.setTextColor(COLOR_SECTION);
        tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, 12);
        tv.setTypeface(Typeface.DEFAULT_BOLD);
        tv.setPadding(0, dp(12), 0, dp(4));
        parent.addView(tv);
    }

    private void addSwitch(LinearLayout parent, String label, String key) {
        LinearLayout row = new LinearLayout(getContext());
        row.setOrientation(LinearLayout.HORIZONTAL);
        row.setGravity(Gravity.CENTER_VERTICAL);
        row.setPadding(dp(8), dp(6), dp(8), dp(6));

        GradientDrawable rowBg = new GradientDrawable();
        rowBg.setCornerRadius(dp(8));
        rowBg.setColor(COLOR_CARD);
        row.setBackground(rowBg);

        TextView tv = new TextView(getContext());
        tv.setText(label);
        tv.setTextColor(COLOR_TEXT);
        tv.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        row.addView(tv, new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f));

        Switch toggle = new Switch(getContext());
        toggle.setChecked(hacks.getOrDefault(key, false));
        toggle.setOnCheckedChangeListener((btn, checked) -> {
            hacks.put(key, checked);
        });
        row.addView(toggle);

        LinearLayout.LayoutParams rowLp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        rowLp.bottomMargin = dp(4);
        parent.addView(row, rowLp);
    }

    private TextView makeCircleButton(String text, int color) {
        TextView btn = new TextView(getContext());
        btn.setText(text);
        btn.setTextColor(Color.WHITE);
        btn.setTextSize(TypedValue.COMPLEX_UNIT_SP, 14);
        btn.setTypeface(Typeface.DEFAULT_BOLD);
        btn.setGravity(Gravity.CENTER);

        GradientDrawable bg = new GradientDrawable();
        bg.setShape(GradientDrawable.OVAL);
        bg.setColor(color);
        btn.setBackground(bg);
        btn.setPadding(dp(2), dp(2), dp(2), dp(2));

        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(dp(30), dp(30));
        btn.setLayoutParams(lp);
        return btn;
    }

    private View makeDivider() {
        View div = new View(getContext());
        div.setBackgroundColor(Color.parseColor("#3A3A4C"));
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, dp(1));
        lp.topMargin = dp(8);
        lp.bottomMargin = dp(4);
        div.setLayoutParams(lp);
        return div;
    }

    private void animateIn() {
        menuPanel.setAlpha(0f);
        menuPanel.setScaleX(0.8f);
        menuPanel.setScaleY(0.8f);
        menuPanel.animate()
                .alpha(1f)
                .scaleX(1f)
                .scaleY(1f)
                .setDuration(200)
                .start();
    }

    private int dp(int val) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, val,
                getResources().getDisplayMetrics());
    }

    public boolean isHackEnabled(String name) {
        return hacks.getOrDefault(name, false);
    }

    public void setHackState(String name, boolean enabled) {
        hacks.put(name, enabled);
    }
}
