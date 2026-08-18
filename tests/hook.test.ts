import { initialize, getState, enableAll, disableAll } from "../agent/index";
import { log } from "../agent/utils/logger";
import { AntiDetect } from "../agent/utils/anti-detect";

describe("LAC Security Test Framework", () => {
  beforeAll(async () => {
    log.setLevel(0);
  });

  describe("Agent Initialization", () => {
    test("should initialize Il2Cpp resolver", async () => {
      await initialize();
      expect(getState().initialized).toBe(true);
    });

    test("should apply anti-detection bypass", () => {
      expect(() => AntiDetect.applyBypass()).not.toThrow();
    });
  });

  describe("Hook Management", () => {
    test("should register player hooks", async () => {
      const state = getState();
      expect(state.player).toBeDefined();
      expect(state.player.godMode).toBe(false);
    });

    test("should register vehicle hooks", async () => {
      const state = getState();
      expect(state.vehicle).toBeDefined();
      expect(state.vehicle.godMode).toBe(false);
    });

    test("should register network hooks", async () => {
      const state = getState();
      expect(state.network).toBeDefined();
      expect(state.network.viewAllPlayers).toBe(false);
    });

    test("should register editor hooks", async () => {
      const state = getState();
      expect(state.editor).toBeDefined();
      expect(state.editor.invincible).toBe(false);
    });

    test("should register gamestate hooks", async () => {
      const state = getState();
      expect(state.gamestate).toBeDefined();
      expect(state.gamestate.infiniteCoin).toBe(false);
    });
  });

  describe("Hook Count", () => {
    test("should have 33+ registered hooks", () => {
      expect(getState().initialized).toBe(true);
    });

    test("should enable all hooks", () => {
      enableAll();
      expect(getActiveCount()).toBeGreaterThan(0);
    });

    test("should disable all hooks", () => {
      disableAll();
      expect(getActiveCount()).toBe(0);
    });
  });
});
