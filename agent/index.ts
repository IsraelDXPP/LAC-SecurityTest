import { resolver } from "../il2cpp/resolver";
import { HookManager } from "../il2cpp/hooks";
import { PlayerHacks, PlayerHacksConfig } from "../modules/player-hacks";
import { VehicleHacks, VehicleHacksConfig } from "../modules/vehicle-hacks";
import { NetworkHacks, NetworkHacksConfig } from "../modules/network-hacks";
import { EditorHacks, EditorHacksConfig } from "../modules/editor-hacks";
import { GamestateHacks, GamestateHacksConfig } from "../modules/gamestate-hacks";
import { log } from "../utils/logger";
import { AntiDetect } from "../utils/anti-detect";

export interface AppState {
  initialized: boolean;
  player: PlayerHacksConfig;
  vehicle: VehicleHacksConfig;
  network: NetworkHacksConfig;
  editor: EditorHacksConfig;
  gamestate: GamestateHacksConfig;
}

let hookManager: HookManager;
let playerHacks: PlayerHacks;
let vehicleHacks: VehicleHacks;
let networkHacks: NetworkHacks;
let editorHacks: EditorHacks;
let gamestateHacks: GamestateHacks;

export async function initialize(): Promise<void> {
  log.info("=== LAC Security Test Framework ===");
  log.info("Initializing Il2Cpp resolver...");

  await resolver.initialize();

  hookManager = new HookManager(resolver);
  playerHacks = new PlayerHacks(hookManager);
  vehicleHacks = new VehicleHacks(hookManager);
  networkHacks = new NetworkHacks(hookManager);
  editorHacks = new EditorHacks(hookManager);
  gamestateHacks = new GamestateHacks(hookManager);

  AntiDetect.applyBypass();

  playerHacks.init();
  vehicleHacks.init();
  networkHacks.init();
  editorHacks.init();
  gamestateHacks.init();

  hookManager.enableAll();

  log.info(`Framework ready. ${hookManager.getActiveCount()} hooks active.`);
}

export function getState(): AppState {
  return {
    initialized: resolver.isReady(),
    player: playerHacks?.getConfig() || {} as PlayerHacksConfig,
    vehicle: vehicleHacks?.getConfig() || {} as VehicleHacksConfig,
    network: networkHacks?.getConfig() || {} as NetworkHacksConfig,
    editor: editorHacks?.getConfig() || {} as EditorHacksConfig,
    gamestate: gamestateHacks?.getConfig() || {} as GamestateHacksConfig,
  };
}

export function updatePlayerConfig(config: Partial<PlayerHacksConfig>): void {
  playerHacks?.updateConfig(config);
}

export function updateVehicleConfig(config: Partial<VehicleHacksConfig>): void {
  vehicleHacks?.updateConfig(config);
}

export function updateNetworkConfig(config: Partial<NetworkHacksConfig>): void {
  networkHacks?.updateConfig(config);
}

export function updateEditorConfig(config: Partial<EditorHacksConfig>): void {
  editorHacks?.updateConfig(config);
}

export function updateGamestateConfig(config: Partial<GamestateHacksConfig>): void {
  gamestateHacks?.updateConfig(config);
}

export function getHookCount(): number {
  return hookManager?.getHookCount() || 0;
}

export function getActiveCount(): number {
  return hookManager?.getActiveCount() || 0;
}

export function getNetworkStats() {
  return networkHacks?.getNetworkStats() || { bytesIn: 0, bytesOut: 0, packetCount: 0 };
}

export function enableAll(): void {
  hookManager?.enableAll();
  log.info("All hooks enabled");
}

export function disableAll(): void {
  hookManager?.disableAll();
  log.info("All hooks disabled");
}
